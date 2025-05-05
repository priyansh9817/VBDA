// src/utils/axios.js
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // for Vite
  // baseURL: process.env.REACT_APP_API_BASE_URL, // for CRA
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
