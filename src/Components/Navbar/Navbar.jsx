import React, { useState, useContext } from 'react'
import './Navbar.css'
import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'
import { Link, useNavigate } from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContext'
import { AuthContext } from '../../Context/AuthContext'

export const Navbar = () => {
    const [menu, setMenu] = useState("main")
    const { getTotalCartItems } = useContext(ShopContext)
    const { user, logout } = useContext(AuthContext)
    const navigate = useNavigate()

    const handleAuthClick = () => {
        if (user) {
            logout();
            navigate('/');
        } else {
            navigate('/login');
        }
    }

    return (
        <div className='navbar'>
            <div className="nav-logo">
                <img src={logo} alt='' />
                <p>RESTAURANT</p>
            </div>
            <ul className="nav-menu">
                <li onClick={() => { setMenu("main") }}>
                    <Link to='/'>Trang chủ</Link>
                    {menu === "main" ? <hr /> : <></>}
                </li>
                <li onClick={() => { setMenu("menu") }}>
                    <Link to='/menu'>Thực đơn</Link>
                    {menu === "menu" ? <hr /> : <></>}
                </li>
                <li onClick={() => { setMenu("booking") }}>
                    <Link to='/booking'>Đặt bàn</Link>
                    {menu === "booking" ? <hr /> : <></>}
                </li>
                <li onClick={() => { setMenu("contact") }}>
                    <Link to='/contact'>Liên hệ</Link>
                    {menu === "contact" ? <hr /> : <></>}
                </li>
                <li onClick={() => { setMenu("rate") }}>
                    <Link to='/rate'>Đánh giá</Link>
                    {menu === "rate" ? <hr /> : <></>}
                </li>
            </ul>
            <div className="nav-login-cart">
                <button onClick={handleAuthClick}>
                    {user ? 'Đăng xuất' : 'Đăng nhập'}
                </button>
                <Link to='/cart'>
                    <img src={cart_icon} alt='' />
                </Link>
                <div className="nav-cart-count">{getTotalCartItems()}</div>
            </div>
        </div>
    )
}

export default Navbar