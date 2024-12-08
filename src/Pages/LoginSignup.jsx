import React, { useState, useContext } from 'react'
import './LoginSignup.css'
import { AuthContext } from '../Context/AuthContext'
import { useNavigate } from 'react-router-dom'

const LoginSignup = () => {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: '',
        phone: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (isLogin) {
            // Xử lý đăng nhập
            try {
                const users = JSON.parse(localStorage.getItem('users') || '[]');
                const user = users.find(u => u.email === formData.email && u.password === formData.password);

                if (user) {
                    const userData = {
                        email: user.email,
                        name: user.name,
                        phone: user.phone,
                        role: 'user'
                    };
                    login(userData);
                    navigate('/');
                } else {
                    setError('Email hoặc mật khẩu không đúng');
                }
            } catch (err) {
                setError('Đã có lỗi xảy ra');
            }
        } else {
            // Xử lý đăng ký
            try {
                if (!formData.email || !formData.password || !formData.name || !formData.phone) {
                    setError('Vui lòng điền đầy đủ thông tin');
                    return;
                }

                // Kiểm tra email đã tồn tại chưa
                const users = JSON.parse(localStorage.getItem('users') || '[]');
                const existingUser = users.find(u => u.email === formData.email);

                if (existingUser) {
                    setError('Email đã được sử dụng');
                    return;
                }

                // Thêm user mới
                const newUser = {
                    email: formData.email,
                    password: formData.password,
                    name: formData.name,
                    phone: formData.phone,
                    role: 'user'
                };

                users.push(newUser);
                localStorage.setItem('users', JSON.stringify(users));

                // Tự động đăng nhập sau khi đăng ký
                const userData = {
                    email: newUser.email,
                    name: newUser.name,
                    phone: newUser.phone,
                    role: 'user'
                };
                login(userData);
                navigate('/');
            } catch (err) {
                setError('Đã có lỗi xảy ra');
            }
        }
    };

    return (
        <div className='loginsignup'>
            <div className="loginsignup-container">
                <h1>{isLogin ? 'Đăng nhập' : 'Đăng ký'}</h1>
                <form onSubmit={handleSubmit}>
                    {!isLogin && (
                        <>
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Họ và tên"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="tel"
                                    name="phone"
                                    placeholder="Số điện thoại"
                                    value={formData.phone}
                                    onChange={handleChange}
                                />
                            </div>
                        </>
                    )}
                    <div className="form-group">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            name="password"
                            placeholder="Mật khẩu"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>
                    {error && <div className="error-message">{error}</div>}
                    <button type="submit">
                        {isLogin ? 'ĐĂNG NHẬP' : 'ĐĂNG KÝ'}
                    </button>
                </form>
                <p className="switch-form">
                    {isLogin ? 'Chưa có tài khoản?' : 'Đã có tài khoản?'}
                    <span onClick={() => {
                        setIsLogin(!isLogin);
                        setFormData({
                            email: '',
                            password: '',
                            name: '',
                            phone: ''
                        });
                        setError('');
                    }}>
                        {isLogin ? ' Đăng ký ngay' : ' Đăng nhập'}
                    </span>
                </p>
            </div>
        </div>
    )
}

export default LoginSignup