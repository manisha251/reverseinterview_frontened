import axios from 'axios';
import mockApi from '../mockApi';

// Check if we're in a static deployment (no backend available)
const USE_MOCK_API = process.env.NODE_ENV === 'production' && 
                    (process.env.REACT_APP_API_URL === '' || 
                     process.env.REACT_APP_API_URL?.includes('localhost'));

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

console.log('API Base URL:', API_BASE_URL);
console.log('Using Mock API:', USE_MOCK_API);

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Auth APIs
export const login = async (credentials) => {
  if (USE_MOCK_API) {
    return await mockApi.login(credentials);
  }
  
  try {
    console.log('Attempting login with:', credentials.email);
    const response = await api.post('/login', credentials);
    console.log('Login successful:', response.data);
    return response.data;
  } catch (error) {
    console.error('Login API Error:', error);
    console.error('Error response:', error.response);
    console.error('Error status:', error.response?.status);
    console.error('Error data:', error.response?.data);
    
    if (error.response) {
      throw new Error(error.response.data.message || 'API request failed');
    } else if (error.request) {
      throw new Error('No response from server. Please check if the backend is running.');
    } else {
      throw new Error(error.message);
    }
  }
};

// Candidate APIs
export const registerCandidate = async (candidateData) => {
  if (USE_MOCK_API) {
    return await mockApi.registerCandidate(candidateData);
  }
  
  try {
    console.log('Sending registration data:', candidateData);
    const response = await api.post('/register/candidate', candidateData);
    console.log('Registration response:', response.data);
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    console.error('Error response:', error.response);
    console.error('Error status:', error.response?.status);
    console.error('Error data:', error.response?.data);
    
    if (error.response) {
      throw new Error(error.response.data.message || 'API request failed');
    } else if (error.request) {
      throw new Error('No response from server. Please check if the backend is running.');
    } else {
      throw new Error(error.message);
    }
  }
};

export const getAllCandidates = async () => {
  if (USE_MOCK_API) {
    return await mockApi.getAllCandidates();
  }
  
  try {
    const response = await api.get('/candidates');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message || 'Failed to fetch candidates');
  }
};

// Company APIs
export const registerCompany = async (companyData) => {
  if (USE_MOCK_API) {
    return await mockApi.registerCompany(companyData);
  }
  
  try {
    const response = await api.post('/register/company', companyData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message || 'Company registration failed');
  }
};

export const getAllCompanies = async () => {
  if (USE_MOCK_API) {
    return await mockApi.getAllCompanies();
  }
  
  try {
    const response = await api.get('/companies');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message || 'Failed to fetch companies');
  }
};

// Offer APIs
export const createOffer = async (offerData) => {
  if (USE_MOCK_API) {
    return await mockApi.createOffer(offerData);
  }
  
  try {
    console.log('Creating offer:', offerData);
    const response = await api.post('/offers', offerData);
    console.log('Offer created:', response.data);
    return response.data;
  } catch (error) {
    console.error('Create offer error:', error);
    throw new Error(error.response?.data?.message || error.message || 'Failed to create offer');
  }
};

export const getAllOffers = async () => {
  if (USE_MOCK_API) {
    return await mockApi.getAllOffers();
  }
  
  try {
    const response = await api.get('/offers');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message || 'Failed to fetch offers');
  }
};

export const getOffersByCandidateId = async (candidateId) => {
  if (USE_MOCK_API) {
    return await mockApi.getOffersByCandidateId(candidateId);
  }
  
  try {
    const response = await api.get(`/offers/candidate/${candidateId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message || 'Failed to fetch candidate offers');
  }
};

export const getOffersByCompanyId = async (companyId) => {
  if (USE_MOCK_API) {
    return await mockApi.getOffersByCompanyId(companyId);
  }
  
  try {
    const response = await api.get(`/offers/company/${companyId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message || 'Failed to fetch company offers');
  }
};

export default api;
