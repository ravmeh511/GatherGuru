import Cookies from 'js-cookie';

// Local storage keys
const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';

export const getAuthToken = () => {
  return Cookies.get('token');
};

export const setAuthToken = (token) => {
  Cookies.set('token', token, { expires: 7 }); // Token expires in 7 days
};

export const removeAuthToken = () => {
  Cookies.remove('token');
};

// Save auth data to local storage
export const saveAuthData = (userData) => {
    if (userData) {
        localStorage.setItem(USER_KEY, JSON.stringify(userData));
    }
};

// Load auth data from local storage
export const loadAuthData = () => {
    try {
        const userStr = localStorage.getItem(USER_KEY);
        return userStr ? JSON.parse(userStr) : null;
    } catch (error) {
        console.error('Error loading auth data:', error);
        return null;
    }
};

// Clear auth data from local storage
export const clearAuthData = () => {
    localStorage.removeItem(USER_KEY);
};

// Check if user is authenticated
export const isAuthenticated = () => {
    return !!loadAuthData();
}; 