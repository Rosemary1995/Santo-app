import React, { useContext } from 'react';
import './HomePage.css';

import AuthContext from "../../context/AuthContext";
import Navbar from '../Navbar/Navbar';

const HomePage = () => {
  const { user } = useContext(AuthContext);
  
  console.log(user)

  return (
    <div className="home-page">
      <Navbar />
      <header className="hero">
        {user?.user &&
        <h1>Hello {user?.user?.name}</h1>
      }
        <h1>Welcome to the Santo E-Book App</h1>
        <p>Your gateway to thousands of books, anytime, anywhere.</p>
        <a href="/books" className="hero-button">Browse Books</a>

      </header>
      <section className="features">
        <h2>Why Choose Us?</h2>
        <div className="feature-cards">
          <div className="card">
            <h3>Wide Selection</h3>
            <p>Explore thousands of titles from different genres and authors.</p>
          </div>
          <div className="card">
            <h3>Affordable Prices</h3>
            <p>Enjoy your favorite books without breaking the bank.</p>
          </div>
          <div className="card">
            <h3>Read Anywhere</h3>
            <p>Access your library from any device, anytime.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
