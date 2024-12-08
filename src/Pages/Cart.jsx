import React, { useContext } from 'react'
import './Cart.css'
import { ShopContext } from '../Context/ShopContext'
import { useNavigate } from 'react-router-dom';

export const Cart = () => {
    const { cartItems, all_product, removeFromCart, addToCart, getTotalCartAmount } = useContext(ShopContext);
    const navigate = useNavigate();

    return (
        <div className='cart'>
            <div className="cart-title">
                <h1>Giỏ hàng của bạn</h1>
            </div>
            <div className="cart-items">
                {all_product.map((item) => {
                    if (cartItems[item.id] > 0) {
                        return (
                            <div key={item.id} className="cart-item">
                                <div className="cart-item-left">
                                    <img src={item.image} alt="" />
                                </div>
                                <div className="cart-item-right">
                                    <div className="cart-item-info">
                                        <h2>{item.name}</h2>
                                        <p className="cart-item-price">{item.new_price}đ</p>
                                    </div>
                                    <div className="cart-item-quantity">
                                        <button onClick={() => removeFromCart(item.id)}>-</button>
                                        <span>{cartItems[item.id]}</span>
                                        <button onClick={() => addToCart(item.id)}>+</button>
                                    </div>
                                    <div className="cart-item-total">
                                        <p>Tổng: {parseInt(item.new_price.replace(/\D/g, '')) * cartItems[item.id]}đ</p>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                    return null;
                })}
            </div>
            {getTotalCartAmount() > 0 ? (
                <div className="cart-bottom">
                    <div className="cart-total">
                        <h2>Tổng giỏ hàng:</h2>
                        <p>{getTotalCartAmount()}đ</p>
                    </div>
                    <div className="cart-buttons">
                        <button onClick={() => navigate('/')}>TIẾP TỤC MUA HÀNG</button>
                        <button>ĐẶT BÀN</button>
                    </div>
                </div>
            ) : (
                <div className="cart-empty">
                    <h2>Giỏ hàng trống</h2>
                    <button onClick={() => navigate('/')}>QUAY LẠI MUA HÀNG</button>
                </div>
            )}
        </div>
    )
}

export default Cart
