import React, { useState, useEffect } from 'react'
import './Booking.css'
import table_data, { updateTableStatus } from '../Components/Assets/table_data'
import TableStatus from '../Components/TableStatus/TableStatus'

export const Booking = () => {
    const [availableTables, setAvailableTables] = useState(table_data);
    const [bookingData, setBookingData] = useState({
        name: '',
        phone: '',
        date: '',
        time: '',
        guests: '',
        note: '',
        selectedTable: ''
    });
    const [refreshKey, setRefreshKey] = useState(0);

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
            date: '',
            time: '',
            guests: '',
            note: '',
            selectedTable: ''
        });
    }

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

        const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
        bookings.push(bookingInfo);
        localStorage.setItem('bookings', JSON.stringify(bookings));

        const updatedTables = updateTableStatus(bookingData.selectedTable, 'booked');
        setAvailableTables(updatedTables);

        setRefreshKey(old => old + 1);

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
            (bookingData.note ? `Ghi chú: ${bookingData.note}` : '')
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
                            <label>Ngày</label>
                            <input
                                type="date"
                                name="date"
                                value={bookingData.date}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Giờ</label>
                            <select
                                name="time"
                                value={bookingData.time}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Chọn giờ</option>
                                <option value="11:00">11:00</option>
                                <option value="12:00">12:00</option>
                                <option value="13:00">13:00</option>
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