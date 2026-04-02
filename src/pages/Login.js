import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/api';
import './Login.css';

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const response = await login(credentials);
      
      if (response.role === 'candidate') {
        navigate('/dashboard/candidate');
      } else if (response.role === 'company') {
        navigate('/dashboard/company');
      }
    } catch (error) {
      console.error('Login error:', error);
      console.error('Error details:', JSON.stringify(error, null, 2));
      const errorMessage = error.response?.data?.message || error.message || 'Invalid email or password';
      setError(errorMessage);
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2>Login</h2>
        {error && <div className="error">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={credentials.email}
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
              value={credentials.password}
              onChange={handleChange}
              required
            />
          </div>
          
          <button type="submit" className="btn btn-primary">Login</button>
        </form>
        
        <div className="links">
          <p>
            Don't have an account?{' '}
            <a href="/register/candidate">Register as Candidate</a> or{' '}
            <a href="/register/company">Register as Company</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
