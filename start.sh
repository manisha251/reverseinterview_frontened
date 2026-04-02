#!/bin/bash

# Set environment variables to fix React Scripts issues
export REACT_APP_API_URL=http://localhost:8080/api
export GENERATE_SOURCEMAP=false
export SKIP_PREFLIGHT_CHECK=true
export DANGEROUSLY_DISABLE_HOST_CHECK=true

# Start the React development server
npm start
