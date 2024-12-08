import React from 'react'
import './Item.css'
import { Link } from 'react-router-dom'

export const Item = (props) => {
    return (
        <Link to={`/product/${props.id}`} className='item-link'>
            <div className='item'>
                <img src={props.image} alt='' />
                <p>{props.name}</p>
                <div className="item-prices">
                    <div className="item-price-new">
                        {props.new_price}đ
                    </div>
                    <div className="item-price-old">
                        {props.old_price}đ
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default Item
