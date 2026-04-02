import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getOffersByCandidateId } from '../services/api';
import './CandidateDashboard.css';

const CandidateDashboard = () => {
  const [candidate, setCandidate] = useState(null);
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // In a real app, this would come from login response or localStorage
    // For demo purposes, we'll use mock data
    const mockCandidate = {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      skills: 'JavaScript, React, Node.js'
    };
    setCandidate(mockCandidate);
    
    // Fetch offers for this candidate
    fetchOffers(mockCandidate.id);
  }, []);

  const fetchOffers = async (candidateId) => {
    try {
      const offersData = await getOffersByCandidateId(candidateId);
      setOffers(offersData);
    } catch (error) {
      console.error('Error fetching offers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    // Clear any stored auth data
    navigate('/');
  };

  if (!candidate) {
    return <div className="container">Loading...</div>;
  }

  return (
    <div className="container">
      <div className="navbar">
        <h2>Candidate Dashboard</h2>
        <div className="nav-links">
          <span>Welcome, {candidate?.name}</span>
          <button onClick={handleLogout} className="btn btn-secondary">Logout</button>
        </div>
      </div>
      
      <div className="dashboard">
        <div className="profile-section">
          <h3>My Profile</h3>
          <div className="card">
            <p><strong>Name:</strong> {candidate?.name}</p>
            <p><strong>Email:</strong> {candidate?.email}</p>
            <p><strong>Skills:</strong> {candidate?.skills}</p>
          </div>
        </div>
        
        <div className="offers-section">
          <h3>My Offers ({offers.length})</h3>
          {offers.length === 0 ? (
            <div className="card">
              <p>No offers received yet.</p>
            </div>
          ) : (
            offers.map(offer => (
              <div key={offer.id} className="card offer-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <h4>Offer from {offer.companyName}</h4>
                  {offer.isVerifiedCompany ? (
                    <span style={{
                      background: '#28a745',
                      color: 'white',
                      padding: '4px 8px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: 'bold'
                    }}>
                      ✓ VERIFIED COMPANY
                    </span>
                  ) : (
                    <span style={{
                      background: '#ffc107',
                      color: '#212529',
                      padding: '4px 8px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: 'bold'
                    }}>
                      ⚠ UNVERIFIED COMPANY
                    </span>
                  )}
                </div>
                <p><strong>Message:</strong> {offer.message}</p>
                <p><small><strong>Received:</strong> {new Date(offer.createdAt).toLocaleDateString()}</small></p>
                <div style={{ marginTop: '10px' }}>
                  <button className="btn btn-success" style={{ marginRight: '10px' }}>
                    Accept
                  </button>
                  <button className="btn btn-secondary">
                    Decline
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CandidateDashboard;
