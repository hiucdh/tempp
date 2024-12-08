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
            <div className="cart-format-main">
                <p>Món ăn</p>
                <p>Tiêu đề</p>
                <p>Giá</p>
                <p>Số lượng</p>
                <p>Tổng</p>
                <p>Xóa</p>
            </div>
            <hr />
            {all_product.map((e) => {
                if (cartItems[e.id] > 0) {
                    return (
                        <div key={e.id}>
                            <div className="cart-format cart-format-main">
                                <img src={e.image} alt="" className='cart-product-icon' />
                                <p>{e.name}</p>
                                <p>{e.new_price}đ</p>
                                <div className="cart-quantity">
                                    <button onClick={() => removeFromCart(e.id)}>-</button>
                                    <p>{cartItems[e.id]}</p>
                                    <button onClick={() => addToCart(e.id)}>+</button>
                                </div>
                                <p>{e.new_price * cartItems[e.id]}đ</p>
                                <button className="cart-remove-icon" onClick={() => removeFromCart(e.id)}>Xóa</button>
                            </div>
                            <hr />
                        </div>
                    )
                }
                return null;
            })}

            {getTotalCartAmount() > 0 ? (
                <div className="cart-bottom">
                    <div className="cart-total">
                        <h2>Tổng giỏ hàng:</h2>
                        <p>{getTotalCartAmount()}đ</p>
                    </div>
                    <div className="cart-buttons">
                        <button onClick={() => navigate('/')}>TIẾP TỤC MUA HÀNG</button>
                        <button onClick={() => navigate('/booking')} className="book-table-btn">
                            ĐẶT BÀN NGAY
                        </button>
                    </div>
                </div>
            ) : (
                <div className="cart-empty">
                    <h2>Giỏ hàng trống</h2>
                    <div className="empty-cart-buttons">
                        <button onClick={() => navigate('/')}>QUAY LẠI MUA HÀNG</button>
                        <button onClick={() => navigate('/booking')} className="book-table-btn">
                            ĐẶT BÀN NGAY
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Cart
