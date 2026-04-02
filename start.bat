@echo off

REM Set environment variables to fix React Scripts issues
set REACT_APP_API_URL=http://localhost:8080/api
set GENERATE_SOURCEMAP=false
set SKIP_PREFLIGHT_CHECK=true
set DANGEROUSLY_DISABLE_HOST_CHECK=true

REM Start the React development server
npm start
