import React, { useState } from 'react';
import './Navbar.css'; // Import the styles

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <a href="/">E-Book App</a>
      </div>
      <div className={`navbar-links ${isMobileMenuOpen ? 'active' : ''}`}>
        <a href="/">Home</a>
        <a href="/books">Books</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
      </div>
      <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
        ☰
      </button>
    </nav>
  );
};

export default Navbar;
