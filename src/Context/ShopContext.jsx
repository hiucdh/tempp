import React, { createContext, useState, useEffect } from 'react'
import all_product from '../Components/Assets/all_product'

export const ShopContext = createContext(null);

export const ShopContextProvider = (props) => {
    // Khởi tạo giỏ hàng từ localStorage hoặc tạo mới
    const getDefaultCart = () => {
        let cart = {};
        for (let i = 0; i < all_product.length; i++) {
            cart[all_product[i].id] = 0;
        }
        return cart;
    }

    const [cartItems, setCartItems] = useState(() => {
        // Kiểm tra localStorage khi khởi tạo
        const savedCart = localStorage.getItem('cartItems');
        return savedCart ? JSON.parse(savedCart) : getDefaultCart();
    });

    // Lưu giỏ hàng vào localStorage mỗi khi có thay đổi
    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (itemId) => {
        setCartItems((prev) => {
            const updatedCart = { ...prev, [itemId]: (prev[itemId] || 0) + 1 };
            return updatedCart;
        });
    }

    const removeFromCart = (itemId) => {
        setCartItems((prev) => {
            const updatedCart = { ...prev, [itemId]: Math.max((prev[itemId] || 0) - 1, 0) };
            return updatedCart;
        });
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = all_product.find((product) => product.id === Number(item));
                totalAmount += itemInfo.new_price * cartItems[item];
            }
        }
        return totalAmount;
    }

    const getTotalCartItems = () => {
        let totalItem = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                totalItem += cartItems[item];
            }
        }
        return totalItem;
    }

    const clearCart = () => {
        const emptyCart = getDefaultCart();
        setCartItems(emptyCart);
        localStorage.removeItem('cartItems'); // Xóa giỏ hàng khỏi localStorage
    }

    const contextValue = {
        all_product,
        cartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        getTotalCartItems,
        clearCart
    }

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider; 