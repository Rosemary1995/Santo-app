import React, { useState } from 'react';
import "../Books/BookItem.css";


const BookItem = ({ book, onBuyNow }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`book-item ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="book-image-container">
        <img className="book-image" src={book.image} alt={book.title} />
        {book.discount && (
          <div className="discount-badge">
            {book.discount}% OFF
          </div>
        )}
      </div>
      <div className="book-details">
        <h3 className="book-title">{book.title}</h3>
        {book.author && <p className="book-author">By {book.author}</p>}
        <p className="book-description">{book.description}</p>
        <div className="book-price-section">
          <div className="price-container">
            {book.originalPrice && (
              <span className="original-price">${book.originalPrice}</span>
            )}
            <span className="current-price">${book.price}</span>
          </div>
          <button 
            className="buy-now-btn"
            onClick={() => onBuyNow(book)}
            aria-label={`Buy ${book.title}`}
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookItem;
