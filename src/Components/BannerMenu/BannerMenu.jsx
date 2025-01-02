import React, { useState } from 'react'
import './BannerMenu.css'
import all_product from '../Assets/all_product'
import Item from '../Item/Item'

export const BannerMenu = () => {
    const [selectedCategory, setSelectedCategory] = useState('all');

    // Danh sách các danh mục món ăn
    const categories = [
        { id: 'all', name: 'Tất cả' },
        { id: 'main_course', name: 'Món chính' },
        { id: 'appetizer', name: 'Khai vị' },
        { id: 'dessert', name: 'Tráng miệng' },
        { id: 'beverage', name: 'Đồ uống' }
    ];

    // Lọc sản phẩm theo danh mục
    const filteredProducts = selectedCategory === 'all'
        ? all_product
        : all_product.filter(item => item.category === selectedCategory);

    return (
        <div className='BannerMenu'>
            {/* Thanh lọc danh mục */}
            <div className="category-filters">
                {categories.map(category => (
                    <button
                        key={category.id}
                        className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
                        onClick={() => setSelectedCategory(category.id)}
                    >
                        {category.name}
                    </button>
                ))}
            </div>

            {/* Hiển thị danh sách món ăn */}
            <div className="collections">
                {filteredProducts.map((item, i) => (
                    <Item
                        key={i}
                        id={item.id}
                        name={item.name}
                        image={item.image}
                        new_price={item.new_price}
                        old_price={item.old_price}
                    />
                ))}
            </div>
            <hr />
        </div>
    )
}

export default BannerMenu