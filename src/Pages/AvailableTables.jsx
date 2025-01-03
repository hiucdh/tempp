import React, { useState } from 'react'
import './TableDetails.css'
import table_data from '../Components/Assets/table_data'
import { useNavigate } from 'react-router-dom'

const AvailableTables = () => {
    const navigate = useNavigate();
    const [showAddForm, setShowAddForm] = useState(false);
    const [newTable, setNewTable] = useState({
        tableNumber: '',
        location: 'Trong nhà',
        capacity: '',
        description: '',
        price: '0',
        status: 'available'
    });

    const availableTables = table_data.filter(table => table.status === 'available');

    const handleBookingClick = () => {
        navigate('/booking');
    }

    const handleAddTable = (e) => {
        e.preventDefault();

        // Tạo ID mới bằng cách lấy ID lớn nhất hiện có + 1
        const newId = Math.max(...table_data.map(table => table.id)) + 1;

        // Tạo bàn mới
        const tableToAdd = {
            id: newId,
            ...newTable
        };

        // Thêm bàn mới vào table_data
        table_data.push(tableToAdd);

        // Reset form và ẩn form
        setNewTable({
            tableNumber: '',
            location: 'Trong nhà',
            capacity: '',
            description: '',
            price: '0',
            status: 'available'
        });
        setShowAddForm(false);
    }

    return (
        <div className='table-details-page'>
            <h1>Bàn còn trống</h1>

            {/* Nút thêm bàn mới */}
            <div className="add-table-section">
                <button
                    className="add-table-btn"
                    onClick={() => setShowAddForm(!showAddForm)}
                >
                    {showAddForm ? 'Hủy' : 'Thêm bàn mới'}
                </button>
            </div>

            {/* Form thêm bàn mới */}
            {showAddForm && (
                <form className="add-table-form" onSubmit={handleAddTable}>
                    <div className="form-group">
                        <label>Số bàn:</label>
                        <input
                            type="text"
                            value={newTable.tableNumber}
                            onChange={(e) => setNewTable({ ...newTable, tableNumber: e.target.value })}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Vị trí:</label>
                        <select
                            value={newTable.location}
                            onChange={(e) => setNewTable({ ...newTable, location: e.target.value })}
                        >
                            <option value="Trong nhà">Trong nhà</option>
                            <option value="Ngoài trời">Ngoài trời</option>
                            <option value="Phòng riêng">Phòng riêng</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Sức chứa (người):</label>
                        <input
                            type="number"
                            value={newTable.capacity}
                            onChange={(e) => setNewTable({ ...newTable, capacity: e.target.value })}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Mô tả:</label>
                        <textarea
                            value={newTable.description}
                            onChange={(e) => setNewTable({ ...newTable, description: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <label>Phụ thu:</label>
                        <input
                            type="number"
                            value={newTable.price}
                            onChange={(e) => setNewTable({ ...newTable, price: e.target.value })}
                        />
                    </div>
                    <button type="submit" className="submit-table-btn">Thêm bàn</button>
                </form>
            )}

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