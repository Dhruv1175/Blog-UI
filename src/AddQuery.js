import React, { useState } from 'react';
import axios from 'axios';

const AddQuery = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    query: ''
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
        const token = localStorage.getItem("token")
        const response = await axios.post(`http://localhost:3080/blog/addquery`, formData,{
            headers: {
              Authorization: `Bearer ${token}`, 
            }
          }); // Replace with your API endpoint

      if (response.data.success) {
        setMessage('Query submitted successfully. A confirmation email has been sent.');
        setFormData({ username: '', email: '', query: '' }); // Reset form
      } else {
        setError('Failed to submit the query.');
      }
    } catch (err) {
      console.error('Error submitting query:', err);
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Submit Your Query</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            className="form-control"
            value={formData.username}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="query">Query</label>
          <textarea
            name="query"
            className="form-control"
            rows="5"
            value={formData.query}
            onChange={handleInputChange}
            required
          ></textarea>
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>

      {/* Success or error messages */}
      {message && <div className="alert alert-success mt-3">{message}</div>}
      {error && <div className="alert alert-danger mt-3">{error}</div>}
    </div>
  );
};

export default AddQuery;
