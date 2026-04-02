import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllCandidates, createOffer } from '../services/api';
import './CompanyDashboard.css';

const CompanyDashboard = () => {
  const [company, setCompany] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [offerMessage, setOfferMessage] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // In a real app, this would come from login response or localStorage
    const mockCompany = {
      id: 1,
      companyName: 'Tech Corp',
      email: 'company@techcorp.com',
      description: 'Leading technology company',
      isVerified: false,
      verificationCode: '123456'
    };
    setCompany(mockCompany);

    // Fetch all candidates
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    try {
      const candidatesData = await getAllCandidates();
      setCandidates(candidatesData);
    } catch (error) {
      console.error('Error fetching candidates:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    // Clear any stored auth data
    navigate('/');
  };

  const handleSendOffer = async (candidateId, candidateName) => {
    const message = prompt(`Enter offer message for ${candidateName}:`, 'We would like to offer you a position at our company!');
    
    if (!message || message.trim() === '') {
      alert('Please enter a message for the offer.');
      return;
    }

    try {
      const offerData = {
        companyId: company?.id,
        candidateId: candidateId,
        message: message.trim()
      };

      await createOffer(offerData);
      setOfferMessage(`Offer successfully sent to ${candidateName}!`);
      
      // Clear message after 3 seconds
      setTimeout(() => {
        setOfferMessage('');
      }, 3000);
      
    } catch (error) {
      console.error('Error sending offer:', error);
      alert(`Failed to send offer: ${error.message}`);
    }
  };

  const handleVerifyCompany = () => {
    const inputCode = prompt('Enter your verification code:');
    if (inputCode === company?.verificationCode) {
      alert('Company verified successfully! You can now send verified offers.');
      // In a real app, this would call an API to update the company status
      setCompany(prev => ({ ...prev, isVerified: true }));
    } else {
      alert('Invalid verification code. Please try again.');
    }
  };

  if (loading) {
    return <div className="container">Loading...</div>;
  }

  return (
    <div className="container">
      <div className="navbar">
        <h2>Company Dashboard</h2>
        <div className="nav-links">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span>Welcome, {company?.companyName}</span>
            {company?.isVerified ? (
              <span style={{
                background: '#28a745',
                color: 'white',
                padding: '4px 8px',
                borderRadius: '12px',
                fontSize: '12px',
                fontWeight: 'bold'
              }}>
                ✓ VERIFIED
              </span>
            ) : (
              <button 
                onClick={handleVerifyCompany}
                className="btn btn-warning"
                style={{ padding: '4px 8px', fontSize: '12px' }}
              >
                Verify Company
              </button>
            )}
          </div>
          <button onClick={handleLogout} className="btn btn-secondary">Logout</button>
        </div>
      </div>
      
      {offerMessage && (
        <div className="success-message" style={{
          background: '#d4edda',
          color: '#155724',
          padding: '10px',
          borderRadius: '4px',
          marginBottom: '20px',
          textAlign: 'center',
          fontWeight: 'bold'
        }}>
          {offerMessage}
        </div>
      )}
      
      <div className="dashboard">
        <div className="profile-section">
          <h3>Company Profile</h3>
          <div className="card">
            <p><strong>Company Name:</strong> {company?.companyName}</p>
            <p><strong>Email:</strong> {company?.email}</p>
            <p><strong>Description:</strong> {company?.description}</p>
            <div style={{ marginTop: '15px', padding: '10px', background: '#f8f9fa', borderRadius: '4px' }}>
              <p><strong>Verification Status:</strong></p>
              {company?.isVerified ? (
                <div>
                  <span style={{ color: '#28a745', fontWeight: 'bold' }}>✓ Verified Company</span>
                  <p style={{ fontSize: '12px', color: '#6c757d', marginTop: '5px' }}>
                    Your offers will be marked as verified to candidates
                  </p>
                </div>
              ) : (
                <div>
                  <span style={{ color: '#ffc107', fontWeight: 'bold' }}>⚠ Unverified Company</span>
                  <p style={{ fontSize: '12px', color: '#6c757d', marginTop: '5px' }}>
                    Verification Code: <strong>{company?.verificationCode}</strong>
                  </p>
                  <p style={{ fontSize: '12px', color: '#6c757d' }}>
                    Click "Verify Company" button above to verify your account
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="candidates-section">
          <h3>Available Candidates</h3>
          {candidates.length === 0 ? (
            <div className="card">
              <p>No candidates available yet.</p>
            </div>
          ) : (
            candidates.map(candidate => (
              <div key={candidate.id} className="card candidate-card">
                <h4>{candidate.name}</h4>
                <p><strong>Email:</strong> {candidate.email}</p>
                <p><strong>Skills:</strong> {candidate.skills || 'Not specified'}</p>
                <button 
                  onClick={() => handleSendOffer(candidate.id, candidate.name)}
                  className="btn btn-success"
                  style={{ marginTop: '10px' }}
                >
                  Send Offer
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CompanyDashboard;
