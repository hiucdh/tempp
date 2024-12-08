import React, { useState, useContext } from 'react'
import './Navbar.css'
import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'
import { Link } from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContext'

export const Navbar = () => {
    const [menu, setMenu] = useState("main")
    const { getTotalCartItems } = useContext(ShopContext)

    return (
        <div className='navbar'>
            <div className="nav-logo">
                <img src={logo} alt='' />
                <p>Nha Hang</p>
            </div>
            <ul className="nav-menu">
                <li onClick={() => { setMenu("main") }}>
                    <Link style={{ textDecoration: 'none' }} to='/'>Trang chu</Link>
                    {menu === "main" ? <hr /> : <></>}
                </li>
                <li onClick={() => { setMenu("shopping") }}>
                    <Link style={{ textDecoration: 'none' }} to='/menu'>Dat Hang</Link>
                    {menu === "shopping" ? <hr /> : <></>}
                </li>
                <li onClick={() => { setMenu("booking") }}>
                    <Link style={{ textDecoration: 'none' }} to='/booking'>Dat Ban</Link>
                    {menu === "booking" ? <hr /> : <></>}
                </li>
                <li onClick={() => { setMenu("contact") }}>
                    <Link style={{ textDecoration: 'none' }} to='/contact'>Lien he</Link>
                    {menu === "contact" ? <hr /> : <></>}
                </li>
                <li onClick={() => { setMenu("rate") }}>
                    <Link style={{ textDecoration: 'none' }} to='/rate'>Danh gia</Link>
                    {menu === "rate" ? <hr /> : <></>}
                </li>
            </ul>
            <div className="nav-login-cart">
                <Link to='/login'>
                    <button>Login</button>
                </Link>
                <Link to='/cart'>
                    <img src={cart_icon} alt='' />
                </Link>
                <div className="nav-cart-count">{getTotalCartItems()}</div>
            </div>
        </div>
    )
}

export default Navbar