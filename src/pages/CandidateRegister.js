import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerCandidate } from '../services/api';
import './CandidateRegister.css';

const CandidateRegister = () => {
  const [candidate, setCandidate] = useState({
    name: '',
    email: '',
    password: '',
    skills: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCandidate({
      ...candidate,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    console.log('Submitting registration with data:', candidate);
    
    try {
      const response = await registerCandidate(candidate);
      console.log('Registration successful:', response);
      setSuccess(`Registration successful! Welcome ${candidate.name}! Redirecting to login...`);
      
      // Clear the form
      setCandidate({
        name: '',
        email: '',
        password: '',
        skills: ''
      });
      
      // Redirect to login after 2 seconds
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      console.error('Registration error:', error);
      console.error('Error details:', JSON.stringify(error, null, 2));
      const errorMessage = error.response?.data?.message || error.message || 'Registration failed. Please try again.';
      setError(errorMessage);
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2>Register as Candidate</h2>
        {error && (
        <div className="error">
          <strong>Error:</strong> {error}
          <details style={{ marginTop: '10px' }}>
            <summary>Technical Details</summary>
            <pre style={{ fontSize: '12px', marginTop: '5px' }}>
              {JSON.stringify(error, null, 2)}
            </pre>
          </details>
        </div>
      )}
        {success && <div className="success">{success}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={candidate.name}
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
              value={candidate.email}
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
              value={candidate.password}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="skills">Skills (comma separated):</label>
            <textarea
              id="skills"
              name="skills"
              value={candidate.skills}
              onChange={handleChange}
              rows="3"
              placeholder="e.g., JavaScript, React, Node.js"
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

export default CandidateRegister;
