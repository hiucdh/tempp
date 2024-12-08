import React from 'react'
import './Popular.css'
import { popular_products } from '../Assets/all_product'
import Item from '../Item/Item'
export const Popular = () => {
    return (
        <div className='popular'>
            <h1>TODAY'S NEW MENU</h1>
            <hr />
            <div className="popular-item">
                {popular_products.map((item, i) => {
                    return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
                })}
            </div>
        </div>
    )
}
export default Popular