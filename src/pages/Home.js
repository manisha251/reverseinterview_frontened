import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="container">
      <div className="hero">
        <h1>Reverse Interview Platform</h1>
        <p>Where candidates find opportunities and companies discover talent</p>
        
        <div className="button-group">
          <Link to="/login" className="btn btn-primary">Login</Link>
          <Link to="/register/candidate" className="btn btn-secondary">Register as Candidate</Link>
          <Link to="/register/company" className="btn btn-success">Register as Company</Link>
          <Link to="/test" className="btn btn-secondary" style={{background: '#ff6b6b'}}>Test API</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
