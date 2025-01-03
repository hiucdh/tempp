import React, { useState, useEffect } from 'react';
import './Rate.css';
import { toast } from 'react-toastify';

const Rate = () => {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [comment, setComment] = useState('');
    const [reviews, setReviews] = useState([]);
    const [name, setName] = useState('');

    useEffect(() => {
        // Lấy đánh giá từ localStorage khi component mount
        const savedReviews = localStorage.getItem('restaurantReviews');
        if (savedReviews) {
            setReviews(JSON.parse(savedReviews));
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (rating === 0) {
            alert('Vui lòng chọn số sao!');
            return;
        }

        const newReview = {
            id: Date.now(),
            name: name || 'Khách',
            rating,
            comment,
            date: new Date().toLocaleDateString('vi-VN')
        };

        const updatedReviews = [newReview, ...reviews];
        setReviews(updatedReviews);
        localStorage.setItem('restaurantReviews', JSON.stringify(updatedReviews));

        // Reset form
        setRating(0);
        setComment('');
        setName('');
        toast.success('Đánh giá đã được gửi thành công!');
    };

    return (
        <div className="rate-container">
            <h1>Đánh Giá Nhà Hàng</h1>

            <div className="rating-form">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="Tên của bạn (không bắt buộc)"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="star-rating">
                        {[...Array(5)].map((_, index) => {
                            const ratingValue = index + 1;
                            return (
                                <button
                                    type="button"
                                    key={index}
                                    className={`star ${ratingValue <= (hover || rating) ? 'active' : ''}`}
                                    onClick={() => setRating(ratingValue)}
                                    onMouseEnter={() => setHover(ratingValue)}
                                    onMouseLeave={() => setHover(rating)}
                                >
                                    <span>★</span>
                                </button>
                            );
                        })}
                    </div>

                    <div className="form-group">
                        <textarea
                            placeholder="Chia sẻ trải nghiệm của bạn..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="submit-btn">Gửi đánh giá</button>
                </form>
            </div>

            <div className="reviews-section">
                <h2>Đánh giá từ khách hàng</h2>
                {reviews.length === 0 ? (
                    <p className="no-reviews">Chưa có đánh giá nào.</p>
                ) : (
                    <div className="reviews-list">
                        {reviews.map((review) => (
                            <div key={review.id} className="review-card">
                                <div className="review-header">
                                    <span className="reviewer-name">{review.name}</span>
                                    <span className="review-date">{review.date}</span>
                                </div>
                                <div className="review-stars">
                                    {[...Array(5)].map((_, index) => (
                                        <span
                                            key={index}
                                            className={`star ${index < review.rating ? 'active' : ''}`}
                                        >
                                            ★
                                        </span>
                                    ))}
                                </div>
                                <p className="review-comment">{review.comment}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Rate;