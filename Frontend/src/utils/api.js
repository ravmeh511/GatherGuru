import axios from 'axios';
import { getAuthToken } from './auth';

// Create axios instance with default config
const api = axios.create({
    baseURL: 'http://localhost:5000/api', // Make sure this matches your backend URL
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
});

// Request interceptor
api.interceptors.request.use(
    (config) => {
        const token = getAuthToken();
        if (token) {
            // Send token as both Bearer and custom header for flexibility
            config.headers.Authorization = `Bearer ${token}`;
            config.headers['x-auth-token'] = token;
        }
        // Log outgoing requests in development
        if (process.env.NODE_ENV === 'development') {
            console.log('API Request:', {
                url: config.url,
                method: config.method,
                data: config.data,
                headers: config.headers
            });
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor
api.interceptors.response.use(
    (response) => {
        // For successful responses, data is in response.data.data
        if (response.data?.data) {
            response.data = response.data.data;
        }
        // Log responses in development
        if (process.env.NODE_ENV === 'development') {
            console.log('API Response:', {
                url: response.config.url,
                status: response.status,
                data: response.data
            });
        }
        return response;
    },
    (error) => {
        // Log errors in development
        if (process.env.NODE_ENV === 'development') {
            console.error('API Error:', {
                url: error.config?.url,
                status: error.response?.status,
                data: error.response?.data,
                message: error.message
            });
        }
        return Promise.reject(error);
    }
);

// Auth endpoints
export const auth = {
    // Admin endpoints
    adminLogin: (data) => api.post('/auth/admin/login', data),
    adminLogout: () => api.post('/auth/admin/logout'),
    getAdminProfile: () => api.get('/auth/admin/profile'),
    updateAdminProfile: (data) => api.put('/auth/admin/profile', data),

    // Organizer endpoints
    registerOrganizer: (data) => api.post('/auth/organizer/register', data),
    organizerLogin: (data) => api.post('/auth/organizer/login', data),
    organizerLogout: () => api.post('/auth/organizer/logout'),
    getOrganizerProfile: () => api.get('/auth/organizer/profile'),
    updateOrganizerProfile: (data) => api.put('/auth/organizer/profile', data),
    verifyToken: (token) => api.post('/auth/verify-token', { token })
};

// Events endpoints
export const events = {
    getAll: () => api.get('/events'),
    getById: (id) => api.get(`/events/${id}`),
    create: (data) => api.post('/events', data),
    update: (id, data) => api.put(`/events/${id}`, data),
    delete: (id) => api.delete(`/events/${id}`),
};

// Users endpoints
export const users = {
    getAll: () => api.get('/users'),
    getById: (id) => api.get(`/users/${id}`),
    update: (id, data) => api.put(`/users/${id}`, data),
    delete: (id) => api.delete(`/users/${id}`),
};

// Analytics endpoints
export const analytics = {
    getDashboardStats: () => api.get('/analytics/dashboard'),
    getRevenueData: () => api.get('/analytics/revenue'),
    getTopEvents: () => api.get('/analytics/top-events'),
    getUserStats: () => api.get('/analytics/user-stats'),
};

export default api; 