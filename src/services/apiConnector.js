import axios from 'axios';

const apiConnector = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:4000/api', // Use environment variable or fallback to localhost
  timeout: 1000,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

// Request interceptor
apiConnector.interceptors.request.use(
  config => {
    const token = document.cookie.split(';').find(item => item.trim().startsWith('token='));
    if (token) {
      config.headers.Authorization = `Bearer ${token.split('=')[1]}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

// Response interceptor
apiConnector.interceptors.response.use(
  response => response,
  error => Promise.reject(error)
);

export default apiConnector;
