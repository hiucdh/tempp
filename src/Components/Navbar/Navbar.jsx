import React, { useState } from 'react'
import './Navbar.css'
import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'
import { Link } from 'react-router'
export const Navbar = () => {
    const [menu, setMenu] = useState("main")
    return (
        <div className='navbar'>
            <div className="nav-logo">
                <img src={logo} alt='' />
                <p>Nha Hang</p>
            </div>
            <ul className="nav-menu">
                <li onClick={() => { setMenu("main") }}><Link style={{ textDecoration: 'none' }} to='/'>Trang chu</Link>{menu === "main" ? <hr /> : <></>}</li>
                <li onClick={() => { setMenu("shopping") }}><Link style={{ textDecoration: 'none' }} to='/menu'>Dat Hang</Link>{menu === "shopping" ? <hr /> : <></>}</li>
                <li onClick={() => { setMenu("contact") }}><Link style={{ textDecoration: 'none' }} to='/contact'>Lien he</Link>{menu === "contact" ? <hr /> : <></>}</li>
                <li onClick={() => { setMenu("rate") }}><Link style={{ textDecoration: 'none' }} to='/rate'>Danh gia</Link>{menu === "rate" ? <hr /> : <></>}</li>
            </ul>
            <div className="nav-login-cart">
                <button><Link style={{ textDecoration: 'none' }} to='/login'>Login</Link></button>
                <Link style={{ textDecoration: 'none' }} to='/cart'><img src={cart_icon} alt='' /></Link>
                <div className="cart-icon-count">0</div>
            </div>
        </div>
    )
}
export default Navbar