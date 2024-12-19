import React from 'react'
import './Offers.css'
import exclusive_image from '../Assets/exclusive_image.png'
import { Link } from 'react-router'
export const Offers = () => {
  return (
    <div className='offers'>
      <div className="offers-left">
        <h1>Exclusive</h1>
        <h1>Offers for you</h1>
        <p>Only on bestseller product</p>
        <Link to='/menu' style={{ textDecoration: 'none' }}><button>Check now</button></Link>
      </div>
      <div className="offers-right">
        <img src={exclusive_image} alt="" />
      </div>
    </div>
  )
}
export default Offers
