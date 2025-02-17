import React, { useState } from 'react';
import './ContactUs.css';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically handle the form submission
    console.log('Form submitted:', formData);
    // Reset form after submission
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div className="contact-container">
      <div className="contact-header">
        <h2>Contact Us</h2>
        <p>Have any questions? We'd love to hear from you.</p>
      </div>

      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="subject">Subject</label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="submit-btn">
          Send Message
        </button>
      </form>

      <div className="contact-info">
        <div className="info-item">
          <i className="fas fa-map-marker-alt"></i>
          <h3>Address</h3>
          <p>49062</p>
          <p>Nairobi kenya</p>
        </div>

        <div className="info-item">
          <i className="fas fa-phone"></i>
          <h3>Phone</h3>
          <p>0795365577</p>
        </div>

        <div className="info-item">
          <i className="fas fa-envelope"></i>
          <h3>Email</h3>
          <p>contact@bookstore.com</p>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;