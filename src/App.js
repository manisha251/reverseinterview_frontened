import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import CandidateDashboard from './pages/CandidateDashboard';
import CompanyDashboard from './pages/CompanyDashboard';
import CandidateRegister from './pages/CandidateRegister';
import CompanyRegister from './pages/CompanyRegister';
import TestApi from './pages/TestApi';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register/candidate" element={<CandidateRegister />} />
        <Route path="/register/company" element={<CompanyRegister />} />
        <Route path="/dashboard/candidate" element={<CandidateDashboard />} />
        <Route path="/dashboard/company" element={<CompanyDashboard />} />
        <Route path="/test" element={<TestApi />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
