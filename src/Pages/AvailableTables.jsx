import React from 'react'
import './TableDetails.css'
import table_data from '../Components/Assets/table_data'
import { useNavigate } from 'react-router-dom'

const AvailableTables = () => {
    const navigate = useNavigate();
    const availableTables = table_data.filter(table => table.status === 'available');

    const handleBookingClick = () => {
        navigate('/booking');
    }

    return (
        <div className='table-details-page'>
            <h1>Bàn còn trống</h1>
            <div className="tables-container">
                {availableTables.map((table) => (
                    <div key={table.id} className="table-detail-card available">
                        <h3>{table.tableNumber}</h3>
                        <div className="table-info">
                            <p><strong>Vị trí:</strong> {table.location}</p>
                            <p><strong>Sức chứa:</strong> {table.capacity} người</p>
                            <p><strong>Mô tả:</strong> {table.description}</p>
                            {table.price !== "0" && (
                                <p><strong>Phụ thu:</strong> {table.price}đ</p>
                            )}
                        </div>
                        <button onClick={handleBookingClick} className="book-now-btn">
                            Đặt ngay
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AvailableTables 