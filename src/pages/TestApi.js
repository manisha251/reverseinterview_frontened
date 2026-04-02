import React, { useState, useEffect } from 'react';
import { registerCandidate, getAllCandidates } from '../services/api';

const TestApi = () => {
  const [result, setResult] = useState('');
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCandidates();
  }, []);

  const loadCandidates = async () => {
    try {
      const data = await getAllCandidates();
      setCandidates(data);
    } catch (error) {
      console.error('Error loading candidates:', error);
    }
  };

  const testApi = async () => {
    setLoading(true);
    setResult('');
    
    try {
      const testData = {
        name: 'Test User ' + Date.now(),
        email: `test${Date.now()}@example.com`,
        password: 'password123',
        skills: 'JavaScript, React'
      };
      
      console.log('Testing API with data:', testData);
      const response = await registerCandidate(testData);
      console.log('API Response:', response);
      setResult('SUCCESS: API working! Response: ' + JSON.stringify(response, null, 2));
      
      // Reload candidates after successful registration
      loadCandidates();
    } catch (error) {
      console.error('API Error:', error);
      setResult('ERROR: ' + JSON.stringify(error, null, 2));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>API Test Page</h2>
      
      <div style={{ marginBottom: '30px' }}>
        <button onClick={testApi} disabled={loading} className="btn btn-primary">
          {loading ? 'Testing...' : 'Test Registration API'}
        </button>
        <button onClick={loadCandidates} className="btn btn-secondary" style={{ marginLeft: '10px' }}>
          Refresh Candidates
        </button>
      </div>
      
      <div style={{ marginBottom: '30px' }}>
        <h3>Current Candidates in Database ({candidates.length}):</h3>
        {candidates.length === 0 ? (
          <p>No candidates found in database.</p>
        ) : (
          <div style={{ background: '#f8f9fa', padding: '15px', borderRadius: '4px' }}>
            {candidates.map(candidate => (
              <div key={candidate.id} style={{ 
                border: '1px solid #ddd', 
                padding: '10px', 
                margin: '5px 0', 
                borderRadius: '4px',
                background: 'white'
              }}>
                <strong>ID:</strong> {candidate.id}<br/>
                <strong>Name:</strong> {candidate.name}<br/>
                <strong>Email:</strong> {candidate.email}<br/>
                <strong>Skills:</strong> {candidate.skills || 'Not specified'}
              </div>
            ))}
          </div>
        )}
      </div>
      
      {result && (
        <div style={{ marginTop: '20px' }}>
          <h3>Result:</h3>
          <pre style={{ background: '#f5f5f5', padding: '10px', borderRadius: '4px' }}>
            {result}
          </pre>
        </div>
      )}
    </div>
  );
};

export default TestApi;
