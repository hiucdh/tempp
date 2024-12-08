import React, { useContext, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import './Product.css'
import { ShopContext } from '../Context/ShopContext';

export const Product = () => {
    const { productId } = useParams();
    const navigate = useNavigate();
    const { all_product, addToCart } = useContext(ShopContext);
    const [quantity, setQuantity] = useState(1);

    if (!all_product) {
        return <div>Loading...</div>
    }

    const product = all_product.find((e) => e.id === Number(productId));

    if (!product) {
        return <div>Product not found</div>
    }

    const relatedProducts = all_product.filter(item =>
        item.category === product.category && item.id !== product.id
    ).slice(0, 4);

    const handleQuantityChange = (type) => {
        if (type === 'increase') {
            setQuantity(prev => prev + 1);
        } else if (type === 'decrease' && quantity > 1) {
            setQuantity(prev => prev - 1);
        }
    }

    const handleAddToCart = () => {
        for (let i = 0; i < quantity; i++) {
            addToCart(product.id);
        }
        alert('Đã thêm món ăn vào giỏ hàng!');
    }

    const handleRelatedProductClick = (productId) => {
        navigate(`/product/${productId}`);
        window.scrollTo(0, 0);
        setQuantity(1);
    }

    return (
        <div className='product'>
            <div className="product-container">
                <div className="product-left">
                    <div className="product-img">
                        <img src={product.image} alt={product.name} />
                    </div>
                    <div className="related-products">
                        <h2>Món ăn liên quan</h2>
                        <div className="related-items">
                            {relatedProducts.map((item) => (
                                <div
                                    key={item.id}
                                    className="related-item"
                                    onClick={() => handleRelatedProductClick(item.id)}
                                >
                                    <img src={item.image} alt={item.name} />
                                    <p>{item.name}</p>
                                    <span>{item.new_price}đ</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="product-right">
                    <div className="product-category">
                        {product.category === 'khaivi' && 'Khai vị'}
                        {product.category === 'monchinh' && 'Món chính'}
                        {product.category === 'monphu' && 'Món phụ'}
                    </div>
                    <h1>{product.name}</h1>
                    <div className="product-price">
                        <div className="price-new">{product.new_price}đ</div>
                        <div className="price-old">{product.old_price}đ</div>
                        <div className="discount">
                            {Math.round((1 - parseInt(product.new_price.replace(/\D/g, '')) /
                                parseInt(product.old_price.replace(/\D/g, ''))) * 100)}% GIẢM
                        </div>
                    </div>
                    <div className="product-description">
                        <h2>Mô tả món ăn</h2>
                        <p>{product.description}</p>
                    </div>
                    <div className="product-size">
                        <h2>Kích cỡ phần ăn</h2>
                        <div className="sizes">
                            <div>Nhỏ</div>
                            <div>Vừa</div>
                            <div>Lớn</div>
                        </div>
                    </div>
                    <div className="product-quantity">
                        <h2>Số lượng</h2>
                        <div className="quantity-selector">
                            <button onClick={() => handleQuantityChange('decrease')}>-</button>
                            <span>{quantity}</span>
                            <button onClick={() => handleQuantityChange('increase')}>+</button>
                        </div>
                    </div>
                    <div className="product-actions">
                        <button className="add-to-cart" onClick={handleAddToCart}>
                            THÊM VÀO GIỎ HÀNG
                        </button>
                        <button className="buy-now">Đặt Bàn</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Product
