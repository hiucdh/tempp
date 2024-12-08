import React from 'react'
import './BannerMenu.css'
import new_collections from '../Assets/new_collections'
import Item from '../Item/Item'
export const BannerMenu = () => {
    return (
        <div className='BannerMenu'>

            <div className="collections">
                {new_collections.map((item, i) => {
                    return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
                })}
            </div>
            <div className="collections">
                {new_collections.map((item, i) => {
                    return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
                })}
            </div>
            <div className="collections">
                {new_collections.map((item, i) => {
                    return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
                })}
            </div>
            <hr />
        </div>
    )
}
export default BannerMenu