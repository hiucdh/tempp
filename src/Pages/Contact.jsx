import React, { useState } from 'react';
import './Contact.css';
import { toast } from 'react-toastify';
const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Ở đây bạn có thể thêm logic gửi form
        toast.success('Gửi thành công');
        setFormData({ name: '', email: '', message: '' });
    };

    return (
        <div className="contact">
            <div className="contact-container">
                <h1>Liên Hệ</h1>
                <div className="contact-info">
                    <div className="info-item">
                        <i className="fas fa-map-marker-alt"></i>
                        <p>DHKH THUA THIEN HUE</p>
                    </div>
                    <div className="info-item">
                        <i className="fas fa-phone"></i>
                        <p>+84 123 456 789</p>
                    </div>
                    <div className="info-item">
                        <i className="fas fa-envelope"></i>
                        <p>nhahangvuive@gmail.com</p>
                    </div>
                </div>
                <form onSubmit={handleSubmit} className="contact-form">
                    <div className="form-group">
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Họ và tên"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Nội dung tin nhắn"
                            required
                        ></textarea>
                    </div>
                    <button type="submit">Gửi</button>
                </form>
            </div>
        </div>
    );
};

export default Contact;