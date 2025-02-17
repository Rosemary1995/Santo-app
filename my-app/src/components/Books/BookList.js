// BookList.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './BookList.css';
import Navbar from '../Navbar/Navbar';

function BookList() {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  
  useEffect(() => {
    fetch('https://santo-app.onrender.com/api/books')
      .then(response => response.json())
      .then(data => setBooks(data))
      .catch(error => console.error('Error fetching books:', error));
  }, []);

  

  return (
    <>
      <Navbar />
      <div className="books-page">
      <h1 className="books-title">Available Books</h1>
      <div className="book-grid">
        {books?.map((book) => (
          <div className="book-card" key={book._id}>
            <div className="book-image-container">
              <img 
                src={book.coverImage} 
                alt={book.title} 
                className="book-image"
              />
            </div>

            <div className="book-info">
              <h3 className="book-title">{book.title}</h3>
              <p className="book-author">by {book.author}</p>
              <p className="book-description">{book.description}</p>
              <p className="book-price">${book.bookingCost}</p>
              <button 
                className="buy-button"
                onClick={() => navigate('/payment', { state: book })}
              >
                Buy Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
    
  );
}

export default BookList;

