// BookList.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { backendUrl } from '../../backend/backend';
import './BookList.css';
import Navbar from '../Navbar/Navbar';
import { FaAmazon, FaShoppingCart } from 'react-icons/fa';

function BookList() {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  
  useEffect(() => {
    fetch(`${backendUrl}/api/books`)
      .then(response => response.json())
      .then(data => setBooks(data))
      .catch(error => console.error('Error fetching books:', error));
  }, []);

  

  return (
    <>
      <Navbar />
      <div className="books-page">
        <h1 className="books-title">Discover Your Next Read</h1>
        <div className="book-grid">
          {books?.map((book) => (
            <div className="book-card" key={book._id}>
              <div className="book-image-container">
                <img 
                  src={book.coverImage} 
                  alt={book.title} 
                  className="book-image"
                  loading="lazy"
                />
              </div>

              <div className="book-info">
                <h3 className="book-title">{book.title}</h3>
                <p className="book-author">by {book.author}</p>
                <p className="book-description">
                  {book.description.length > 150 
                    ? `${book.description.substring(0, 150)}...` 
                    : book.description}
                </p>
                <p className="book-price">KES {book.bookingCost.toLocaleString()}</p>
                <div className="button-container">
                  <button 
                    className="buy-button primary"
                    onClick={() => navigate('/payment', { state: book })}
                  >
                    <FaShoppingCart className="button-icon" />
                    Buy Now Mpesa option
                  </button>
                  <a 
                    href="https://www.amazon.com/Wanjiku-Legacy-Stephen-Gichia-Njuguna-ebook/dp/B0DY5LD864"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="buy-button amazon"
                  >
                    <FaAmazon className="button-icon" />
                    Buy on Amazon
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
    
  );
}

export default BookList;

