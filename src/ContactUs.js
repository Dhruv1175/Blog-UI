import React, { useState } from 'react';
import './ContactUs.css';
import axios from 'axios';

const ContactUs = () => {
  const [formData, setFormData] = useState({ username: '', email: '', query: '' });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/query', formData);
      setMessage(res.data.message);
      setFormData({ username: '', email: '', query: '' });
    } catch (error) {
      setMessage("Error submitting your query. Please try again later.");
    }
  };

  return (
    <div className="contact-container">
      <h1 className="contact-title">Contact Us</h1>
      <p className="contact-subtitle">We'd love to hear from you! Send us your questions or feedback.</p>
      
      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Name:</label>
          <input 
            type="text" 
            name="username" 
            value={formData.username} 
            onChange={handleChange} 
            className="form-control" 
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            className="form-control" 
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="query">Your Message:</label>
          <textarea 
            name="query" 
            value={formData.query} 
            onChange={handleChange} 
            className="form-control" 
            rows="5" 
            required 
          ></textarea>
        </div>
        <button type="submit" className="submit-btn">Submit</button>
      </form>

      {message && <p className="contact-message">{message}</p>}
    </div>
  );
};

export default ContactUs;
