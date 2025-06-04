import axios from 'axios';

const API_URL = 'http://localhost:8000/api'; // Update this to match your backend URL

// Create axios instance with default config
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor to add token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = document.cookie.split('; ').find(row => row.startsWith('token='));
    if (token) {
      config.headers.Authorization = `Bearer ${token.split('=')[1]}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

export const loginAdmin = async (credentials) => {
  try {
    const response = await axiosInstance.post('/admin/login', credentials);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Network error occurred' };
  }
};

export const logoutAdmin = async () => {
  try {
    await axiosInstance.post('/admin/logout');
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  } catch (error) {
    console.error('Logout error:', error);
    // Still remove the token even if the API call fails
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  }
};

export const checkAuthStatus = async () => {
  try {
    const response = await axiosInstance.get('/admin/auth-status');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Network error occurred' };
  }
}; 