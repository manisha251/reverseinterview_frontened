import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerCompany } from '../services/api';
import './CompanyRegister.css';

const CompanyRegister = () => {
  const [company, setCompany] = useState({
    companyName: '',
    email: '',
    password: '',
    description: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCompany({
      ...company,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    try {
      await registerCompany(company);
      setSuccess('Registration successful! Please login.');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2>Register as Company</h2>
        {error && <div className="error">{error}</div>}
        {success && <div className="success">{success}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="companyName">Company Name:</label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              value={company.companyName}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={company.email}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={company.password}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="description">Company Description:</label>
            <textarea
              id="description"
              name="description"
              value={company.description}
              onChange={handleChange}
              rows="4"
              placeholder="Tell us about your company..."
            />
          </div>
          
          <button type="submit" className="btn btn-primary">Register</button>
        </form>
        
        <div className="links">
          <p>
            Already have an account? <a href="/login">Login here</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CompanyRegister;
