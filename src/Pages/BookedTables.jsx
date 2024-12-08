import React from 'react'
import './TableDetails.css'
import table_data from '../Components/Assets/table_data'

const BookedTables = () => {
    // Lấy thông tin đặt bàn từ localStorage
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    const bookedTables = table_data.filter(table => table.status === 'booked');

    return (
        <div className='table-details-page'>
            <h1>Bàn đã đặt</h1>
            <div className="tables-container">
                {bookedTables.map((table) => {
                    const booking = bookings.find(b => b.selectedTable === table.id);
                    return (
                        <div key={table.id} className="table-detail-card booked">
                            <h3>{table.tableNumber}</h3>
                            <div className="table-info">
                                <p><strong>Vị trí:</strong> {table.location}</p>
                                <p><strong>Sức chứa:</strong> {table.capacity} người</p>
                                {booking && (
                                    <>
                                        <p><strong>Đã đặt bởi:</strong> {booking.name}</p>
                                        <p><strong>Ngày đặt:</strong> {booking.date}</p>
                                        <p><strong>Giờ:</strong> {booking.time}</p>
                                    </>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}

export default BookedTables 