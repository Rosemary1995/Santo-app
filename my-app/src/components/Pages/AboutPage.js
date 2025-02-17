import React from 'react';
import "../Pages/About.css";


const AboutPage = () => {
  return (
    <div className="about-page">
      <header className="about-hero">
        <h1>About Us</h1>
        <p>Discover who we are and what drives us.</p>
      </header>
      <section className="about-content">
        <h2>Our Mission</h2>
        <p>
          At Santo E-Book App, we aim to make reading accessible and enjoyable for everyone. Whether you're a bookworm or just starting your reading journey, we've got something for you.
        </p>
        <h2>Our Values</h2>
        <ul>
          <li><strong>Accessibility:</strong> Bringing books to everyone, everywhere.</li>
          <li><strong>Innovation:</strong> Leveraging technology to enhance your reading experience.</li>
          <li><strong>Community:</strong> Building a platform where readers and authors connect.</li>
        </ul>
      </section>
    </div>
  );
};

export default AboutPage;
