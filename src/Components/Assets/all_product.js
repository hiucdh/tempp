import p1_img from './p1_img.jpg'
import p2_img from './p2_img.jpg'
import p3_img from './p3_img.webp'
import p4_img from './p4_img.jpg'
import ncl1 from './ncl1.jpeg'
import ncl2 from './ncl2.png'
import ncl3 from './ncl3.jpg'
import ncl4 from './ncl4.jpg'
import ncl5 from './ncl5.jpg'
import ncl6 from './ncl6.webp'
import ncl7 from './ncl7.webp'
import ncl8 from './ncl8.webp'

const all_product = [
    {
        id: 1,
        name: "Gà nướng muối ớt",
        category: "main_course",
        image: p1_img,
        new_price: 250000,
        old_price: 280000,
        isPopular: true,
        isNewCollection: false
    },
    {
        id: 2,
        name: "Cá hồi sốt chanh dây",
        category: "main_course",
        image: p2_img,
        new_price: 320000,
        old_price: 350000,
        isPopular: true,
        isNewCollection: true
    },
    {
        id: 3,
        name: "Bò hầm rượu vang",
        category: "main_course",
        image: p3_img,
        new_price: 380000,
        old_price: 420000,
        isPopular: true,
        isNewCollection: false
    },
    {
        id: 4,
        name: "Salad trộn kiểu Ý",
        category: "appetizer",
        image: p4_img,
        new_price: 120000,
        old_price: 150000,
        isPopular: true,
        isNewCollection: false
    },
    {
        id: 5,
        name: "Súp hải sản",
        category: "appetizer",
        image: ncl1,
        new_price: 150000,
        old_price: 180000,
        isPopular: false,
        isNewCollection: true
    },
    {
        id: 6,
        name: "Bánh mì bơ tỏi",
        category: "appetizer",
        image: ncl2,
        new_price: 80000,
        old_price: 100000,
        isPopular: false,
        isNewCollection: true
    },
    {
        id: 7,
        name: "Tiramisu",
        category: "dessert",
        image: ncl3,
        new_price: 90000,
        old_price: 110000,
        isPopular: false,
        isNewCollection: true
    },
    {
        id: 8,
        name: "Bánh Chocolate Lava",
        category: "dessert",
        image: ncl4,
        new_price: 100000,
        old_price: 120000,
        isPopular: false,
        isNewCollection: true
    },
    {
        id: 9,
        name: "Kem Vanilla",
        category: "dessert",
        image: ncl5,
        new_price: 70000,
        old_price: 85000,
        isPopular: false,
        isNewCollection: false
    },
    {
        id: 10,
        name: "Rượu vang đỏ",
        category: "beverage",
        image: ncl6,
        new_price: 850000,
        old_price: 950000,
        isPopular: false,
        isNewCollection: true
    },
    {
        id: 11,
        name: "Cocktail Mojito",
        category: "beverage",
        image: ncl7,
        new_price: 120000,
        old_price: 150000,
        isPopular: false,
        isNewCollection: true
    },
    {
        id: 12,
        name: "Nước ép cam tươi",
        category: "beverage",
        image: ncl8,
        new_price: 60000,
        old_price: 75000,
        isPopular: false,
        isNewCollection: true
    }
];

// Lấy danh sách món ăn phổ biến
export const popular_products = all_product.filter(item => item.isPopular);

// Lấy danh sách món ăn mới
export const new_collections = all_product.filter(item => item.isNewCollection);

// Export mặc định tất cả sản phẩm
export default all_product; 