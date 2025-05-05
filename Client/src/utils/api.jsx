import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL + '/api',
});

// Automatically add token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  
  // Debugging: Check if the token exists and log it for debugging purposes
  console.log("Token in request:", token);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  // Handle request error if any
  console.error('Error in request interceptor:', error);
  return Promise.reject(error);
});

// Optional: Handle response errors globally
api.interceptors.response.use(
  (response) => response, // If request is successful, simply return the response
  (error) => {
    // Handle response error (e.g., token expiration, unauthorized)
    if (error.response && error.response.status === 401) {
      console.error("Unauthorized request, check your token.");
      // Handle token expiration logic (e.g., log the user out)
    }
    return Promise.reject(error);
  }
);

export default api;
