import React, { useContext, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import './Product.css'
import { ShopContext } from '../Context/ShopContext';
import { AuthContext } from '../Context/AuthContext';

export const Product = () => {
    const { productId } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const { all_product, addToCart } = useContext(ShopContext);
    const [quantity, setQuantity] = useState(1);

    const product = all_product.find((e) => e.id === Number(productId));

    const handleBookingClick = () => {
        if (!user) {
            alert('Vui lòng đăng nhập để đặt bàn!');
            navigate('/login');
            return;
        }
        navigate('/booking');
    }

    // Format giá tiền
    const formatPrice = (price) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    return (
        <div className='product'>
            <div className="product-container">
                <div className="product-left">
                    <img src={product.image} alt="" />
                </div>
                <div className="product-right">
                    <h1>{product.name}</h1>
                    <div className="product-price">
                        <p className="new-price">{formatPrice(product.new_price)}đ</p>
                        {product.old_price && (
                            <p className="old-price">{formatPrice(product.old_price)}đ</p>
                        )}
                    </div>
                    <div className="product-quantity">
                        <h3>Số lượng:</h3>
                        <div className="quantity-controls">
                            <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                            <span>{quantity}</span>
                            <button onClick={() => setQuantity(quantity + 1)}>+</button>
                        </div>
                    </div>
                    <div className="product-actions">
                        <button onClick={() => {
                            for (let i = 0; i < quantity; i++) {
                                addToCart(product.id);
                            }
                            alert('Đã thêm vào giỏ hàng!');
                        }} className="add-to-cart">
                            THÊM VÀO GIỎ HÀNG
                        </button>
                        <button onClick={handleBookingClick} className="book-table">
                            ĐẶT BÀN NGAY
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Product
