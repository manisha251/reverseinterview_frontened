# Reverse Interview Platform - Frontend

React frontend application for the Reverse Interview Platform.

## Features

- **Home Page**: Landing page with navigation options
- **Authentication**: Login and registration for candidates/companies
- **Dashboards**: Role-specific dashboards
- **Responsive Design**: Mobile-friendly interface

## Technology Stack

- React 18
- React Router 6
- Axios for HTTP requests
- CSS3 for styling

## Setup

```bash
npm install
npm start
```

Application will run on: http://localhost:3000

## Project Structure

```
src/
├── components/     # Reusable components
├── pages/         # Page components
├── services/      # API service functions
├── App.js         # Main app component with routing
├── index.js       # Entry point
└── index.css      # Global styles
```

## Pages

### Home (`/`)
- Landing page with navigation buttons
- Options to login or register

### Login (`/login`)
- Single login form for both candidates and companies
- Role-based redirection after successful login
- Error handling for invalid credentials

### Registration
- **Candidate Registration** (`/register/candidate`)
- **Company Registration** (`/register/company`)
- Form validation and success/error messages

### Dashboards
- **Candidate Dashboard** (`/dashboard/candidate`)
  - Profile information display
  - Offers section (placeholder for future implementation)
  
- **Company Dashboard** (`/dashboard/company`)
  - Company profile display
  - Browse all candidates
  - Send offers functionality (placeholder)

## API Integration

All API calls are handled through the `services/api.js` module:

```javascript
import { login, registerCandidate, registerCompany, getAllCandidates } from './services/api';
```

### Available API Functions

- `login(credentials)` - Authenticate user
- `registerCandidate(candidateData)` - Register new candidate
- `registerCompany(companyData)` - Register new company
- `getAllCandidates()` - Get all candidates
- `getAllCompanies()` - Get all companies

## Styling

- Global styles in `index.css`
- Component-specific CSS files
- Responsive design with media queries
- Modern UI with gradients and transitions

## Navigation

React Router handles all navigation:

```javascript
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/login" element={<Login />} />
  <Route path="/register/candidate" element={<CandidateRegister />} />
  <Route path="/register/company" element={<CompanyRegister />} />
  <Route path="/dashboard/candidate" element={<CandidateDashboard />} />
  <Route path="/dashboard/company" element={<CompanyDashboard />} />
</Routes>
```

## State Management

- React hooks (useState, useEffect) for local state
- No global state management (Redux/Context) for simplicity
- Mock data used in dashboards for demonstration

## Notes

- Form validation is basic (HTML5 validation)
- Error handling shows user-friendly messages
- Success messages with automatic redirection
- Responsive design works on mobile devices
