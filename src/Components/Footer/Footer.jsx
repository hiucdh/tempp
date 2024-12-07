import React from 'react'
import './Footer.css'
import footer_logo from '../Assets/logo.png'
import instagram_icon from '../Assets/instagram.png'
import facebook_icon from '../Assets/facebook.png'
import github_icon from '../Assets/github.png'
export const Footer = () => {
    return (
        <div className='footer'>
            <div className="footer-logo">
                <img src={footer_logo} alt="" />
                <p>Nhà Hàng</p>
            </div>
            <ul className="footer-links">
                <li>Công ty</li>
                <li>Món ăn</li>
                <li>Về chúng tôi</li>
                <li>Liên Hệ</li>
            </ul>
            <div className="footer-social-icon">
                <div className="footer-icons-container">
                    <img src={instagram_icon} alt="" />
                </div>
                <div className="footer-icons-container">
                    <img src={github_icon} alt="" />
                </div>
                <div className="footer-icons-container">
                    <img src={facebook_icon} alt="" />
                </div>
            </div>
            <div className="footer-copyright">
                <hr />
                <p>Copyright @ 2024 - All Right Reserved.</p>
            </div>
        </div>
    )
}
export default Footer
