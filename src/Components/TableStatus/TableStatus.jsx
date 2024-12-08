import React from 'react'
import './TableStatus.css'
import table_data from '../Assets/table_data'

const TableStatus = () => {
    // Tính số lượng bàn theo trạng thái
    const availableCount = table_data.filter(table => table.status === 'available').length;
    const bookedCount = table_data.filter(table => table.status === 'booked').length;

    // Tính theo loại bàn
    const indoorTables = table_data.filter(table => table.location === 'Trong nhà').length;
    const outdoorTables = table_data.filter(table => table.location === 'Ngoài trời').length;
    const vipTables = table_data.filter(table => table.location === 'Phòng riêng').length;

    return (
        <div className='table-status-container'>
            <h2>Trạng thái bàn</h2>
            <div className="table-status-grid">
                <div className="status-card available">
                    <h3>Bàn trống</h3>
                    <span className="status-count">{availableCount}</span>
                </div>
                <div className="status-card booked">
                    <h3>Bàn đã đặt</h3>
                    <span className="status-count">{bookedCount}</span>
                </div>
                <div className="status-card total">
                    <h3>Tổng số bàn</h3>
                    <span className="status-count">{table_data.length}</span>
                </div>
            </div>

            <div className="table-types">
                <h3>Phân loại bàn</h3>
                <div className="type-grid">
                    <div className="type-card">
                        <span className="type-icon">🏠</span>
                        <p>Trong nhà</p>
                        <span className="type-count">{indoorTables}</span>
                    </div>
                    <div className="type-card">
                        <span className="type-icon">🌳</span>
                        <p>Ngoài trời</p>
                        <span className="type-count">{outdoorTables}</span>
                    </div>
                    <div className="type-card">
                        <span className="type-icon">👑</span>
                        <p>Phòng VIP</p>
                        <span className="type-count">{vipTables}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TableStatus 