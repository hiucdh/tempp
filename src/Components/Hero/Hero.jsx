import React from 'react'
import './Hero.css'
import hand from '../Assets/hand.png'
import chicken from '../Assets/chiken.png'
import right from '../Assets/right.png'
import { Link } from 'react-router-dom'
export const Hero = () => {
    return (
        <div className='hero'>
            <div className="hero-left">
                <h2>NEW ARRIVALS ONLY</h2>
                <div>
                    <div className="hero-hand-icon">
                        <p>new</p>
                        <img src={hand} alt='' />
                    </div>
                    <p>collections</p>
                    <p>for everyone</p>
                </div>
                <Link to='/menu' style={{ textDecoration: 'none' }}>
                    <div className="hero-lastest-btn">
                        <div>Lastest collections</div>
                        <img src={right} alt='' />
                    </div>
                </Link>

            </div>
            <div className="hero-right">
                <img src={chicken} alt='' />
            </div>
        </div>
    )
}
export default Hero
