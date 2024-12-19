import React, { useState, useEffect, useContext } from 'react'
import './Booking.css'
import table_data, { updateTableStatus } from '../Components/Assets/table_data'
import TableStatus from '../Components/TableStatus/TableStatus'
import { ShopContext } from '../Context/ShopContext'
import emailjs from '@emailjs/browser';

export const Booking = () => {
    const [availableTables, setAvailableTables] = useState(table_data);
    const [refreshKey, setRefreshKey] = useState(0);
    const { clearCart, cartItems, all_product, getTotalCartAmount } = useContext(ShopContext);
    const [bookingData, setBookingData] = useState({
        name: '',
        phone: '',
        email: '',
        date: '',
        time: '',
        guests: '',
        note: '',
        selectedTable: ''
    });

    useEffect(() => {
        setAvailableTables(table_data);
    }, [refreshKey]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setBookingData(prev => ({
            ...prev,
            [name]: value
        }));

        if (name === 'guests') {
            const filtered = table_data.filter(table => table.capacity === value);
            setAvailableTables(filtered);
        }
    }

    const handleDateBlur = (e) => {
        const value = e.target.value;
        if (value) {  // Chỉ validate khi có giá trị
            const selectedDate = new Date(value + 'T00:00:00');
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            if (selectedDate < today) {
                alert('Ngày không hợp lệ');
                e.target.value = '';
                setBookingData(prev => ({
                    ...prev,
                    date: ''
                }));
            }
        }
    }

    const handleTimeBlur = (e) => {
        const value = e.target.value;
        if (value) {  // Chỉ validate khi có giá trị
            if (!bookingData.date) {
                alert('Vui lòng chọn ngày trước!');
                e.target.value = '';
                setBookingData(prev => ({
                    ...prev,
                    time: ''
                }));
                return;
            }

            const [hours] = value.split(':');
            const selectedDateTime = new Date(bookingData.date);
            selectedDateTime.setHours(parseInt(hours), 0, 0, 0);

            const now = new Date();

            if (selectedDateTime.toDateString() === now.toDateString()) {
                if (parseInt(hours) <= now.getHours()) {
                    alert('Giờ không hợp lệ');
                    e.target.value = '';
                    setBookingData(prev => ({
                        ...prev,
                        time: ''
                    }));
                }
            }
        }
    }

    const handleTableSelect = (tableId) => {
        setBookingData(prev => ({
            ...prev,
            selectedTable: tableId
        }));
    }

    const resetForm = () => {
        setBookingData({
            name: '',
            phone: '',
            email: '',
            date: '',
            time: '',
            guests: '',
            note: '',
            selectedTable: ''
        });
    }

    const sendEmail = (bookingInfo) => {
        // Tạo danh sách món ăn từ giỏ hàng
        const cartItemsList = all_product
            .filter(item => cartItems[item.id] > 0)
            .map(item => `
                Món: ${item.name}
                Số lượng: ${cartItems[item.id]}
                Đơn giá: ${item.new_price.toLocaleString()}đ
                Thành tiền: ${(item.new_price * cartItems[item.id]).toLocaleString()}đ
            `).join('\n');

        const selectedTable = table_data.find(table => table.id === bookingData.selectedTable);
        const totalAmount = getTotalCartAmount().toLocaleString();

        const emailParams = {
            to_name: bookingInfo.name,
            to_email: bookingInfo.email,
            from_name: "Nhà Hàng Vui Vẻ",
            booking_details: `
    Kính gửi ${bookingInfo.name},

    Cảm ơn quý khách đã đặt bàn tại Nhà Hàng Vui Vẻ. Dưới đây là thông tin đặt bàn của quý khách:

    THÔNG TIN ĐẶT BÀN:
    - Tên: ${bookingInfo.name}
    - Số điện thoại: ${bookingInfo.phone}
    - Email: ${bookingInfo.email}
    - Ngày: ${bookingInfo.date}
    - Giờ: ${bookingInfo.time}
    - Số người: ${bookingInfo.guests}
    - Bàn số: ${selectedTable.tableNumber}
    - Vị trí: ${selectedTable.location}
    ${selectedTable.price !== "0" ? `- Phụ thu: ${parseInt(selectedTable.price).toLocaleString()}đ\n` : ''}
    ${bookingInfo.note ? `- Ghi chú: ${bookingInfo.note}\n` : ''}

    DANH SÁCH MÓN ĂN:
    ${cartItemsList}

    Tổng cộng: ${totalAmount}đ

    Nếu quý khách có bất kỳ thắc mắc nào, vui lòng liên hệ với chúng tôi qua số điện thoại: XXX-XXX-XXXX

    Trân trọng,
    Nhà Hàng Vui Vẻ
        `
        };

        emailjs.send(
            'service_ay1f916',
            'template_1u6fzr8',
            emailParams,
            'LXAzXRj8M2BWEdZvr'
        )
            .then((result) => {
                console.log('Email sent successfully:', result.text);
            })
            .catch((error) => {
                console.error('Error sending email:', error.text);
                alert('Có lỗi khi gửi email. Vui lòng thử lại sau!');
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!bookingData.selectedTable) {
            alert('Vui lòng chọn bàn!');
            return;
        }

        const bookingInfo = {
            ...bookingData,
            bookingTime: new Date().toISOString(),
            status: 'confirmed'
        };

        // Lưu thông tin đặt bàn
        const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
        bookings.push(bookingInfo);
        localStorage.setItem('bookings', JSON.stringify(bookings));

        // Cập nhật trạng thái bàn
        const updatedTables = updateTableStatus(bookingData.selectedTable, 'booked');
        setAvailableTables(updatedTables);
        setRefreshKey(old => old + 1);

        // Gửi email
        sendEmail(bookingInfo);

        // Xóa giỏ hàng
        clearCart();

        // Hiển thị thông báo thành công
        const selectedTable = table_data.find(table => table.id === bookingData.selectedTable);
        alert(
            'Đặt bàn thành công!\n\n' +
            `Tên: ${bookingData.name}\n` +
            `Số điện thoại: ${bookingData.phone}\n` +
            `Ngày: ${bookingData.date}\n` +
            `Giờ: ${bookingData.time}\n` +
            `Số người: ${bookingData.guests}\n` +
            `Bàn: ${selectedTable.tableNumber}\n` +
            `Vị trí: ${selectedTable.location}\n` +
            (selectedTable.price !== "0" ? `Phụ thu: ${selectedTable.price}đ\n` : '') +
            (bookingData.note ? `Ghi chú: ${bookingData.note}` : '') +
            '\n\nThông tin chi tiết đã được gửi qua email!'
        );

        resetForm();
    }

    return (
        <div className='booking-page'>
            <TableStatus key={refreshKey} />
            <div className='booking-container'>
                <div className='booking-form-container'>
                    <h1>Đặt bàn</h1>
                    <form onSubmit={handleSubmit} className="booking-form">
                        <div className="form-group">
                            <label>Họ và tên</label>
                            <input
                                type="text"
                                name="name"
                                value={bookingData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Số điện thoại</label>
                            <input
                                type="tel"
                                name="phone"
                                value={bookingData.phone}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                name="email"
                                value={bookingData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Ngày</label>
                            <input
                                type="date"
                                name="date"
                                value={bookingData.date}
                                onChange={handleChange}
                                onBlur={handleDateBlur}
                                min={new Date().toISOString().split('T')[0]}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Giờ</label>
                            <select
                                name="time"
                                value={bookingData.time}
                                onChange={handleChange}
                                onBlur={handleTimeBlur}
                                required
                            >
                                <option value="">Chọn giờ</option>
                                <option value="11:00">11:00</option>
                                <option value="12:00">12:00</option>
                                <option value="13:00">13:00</option>
                                <option value="14:00">14:00</option>
                                <option value="15:00">15:00</option>
                                <option value="16:00">16:00</option>
                                <option value="17:00">17:00</option>
                                <option value="18:00">18:00</option>
                                <option value="19:00">19:00</option>
                                <option value="20:00">20:00</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Số người</label>
                            <select
                                name="guests"
                                value={bookingData.guests}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Chọn số người</option>
                                <option value="1-2">1-2 người</option>
                                <option value="3-5">3-5 người</option>
                                <option value="6-10">6-10 người</option>
                                <option value="10+">Trên 10 người</option>
                            </select>
                        </div>

                        <div className="available-tables">
                            <h3>Danh sách bàn</h3>
                            <div className="tables-grid">
                                {availableTables.map((table) => (
                                    <div
                                        key={table.id}
                                        className={`table-card ${bookingData.selectedTable === table.id ? 'selected' : ''} ${table.status === 'booked' ? 'booked' : ''}`}
                                        onClick={() => table.status === 'available' && handleTableSelect(table.id)}
                                    >
                                        <h4>{table.tableNumber}</h4>
                                        <p className="table-location">Vị trí: {table.location}</p>
                                        <p className="table-capacity">Sức chứa: {table.capacity} người</p>
                                        <p className="table-description">{table.description}</p>
                                        <p className="table-status">
                                            Trạng thái: {table.status === 'available' ? 'Còn trống' : 'Đã đặt'}
                                        </p>
                                        {table.price !== "0" && (
                                            <p className="table-price">Phụ thu: {table.price}đ</p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Ghi chú</label>
                            <textarea
                                name="note"
                                value={bookingData.note}
                                onChange={handleChange}
                                placeholder="Yêu cầu đặc biệt..."
                            ></textarea>
                        </div>
                        <button type="submit">Đặt bàn</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Booking 