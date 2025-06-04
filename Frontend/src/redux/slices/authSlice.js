import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

let user = null;
const token = Cookies.get('token');
if (token) {
  try {
    user = jwtDecode(token);
  } catch (err) {
    console.error("Invalid token");
  }
}

const initialState = {
  isLoggedIn: !!token,
  user: user,
  error: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
      state.error = null;
      // Store token in cookie if it's provided
      if (action.payload.token) {
        Cookies.set('token', action.payload.token);
      }
    },
    loginFailure: (state, action) => {
      state.user = null;
      state.isLoggedIn = false;
      state.error = action.payload;
      Cookies.remove('token');
    },
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      state.error = null;
      Cookies.remove('token');
    },
    clearError: (state) => {
      state.error = null;
    }
  },
});

export const {
  loginSuccess,
  loginFailure,
  logout,
  clearError
} = authSlice.actions;

// Async action creator for checking auth status
export const checkAuthStatus = () => async (dispatch) => {
  try {
    const token = Cookies.get('token');
    if (!token) {
      dispatch(logout());
      return;
    }

    // Make API call to verify token
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/api/admin/auth-status`,
      { withCredentials: true }
    );

    if (response.status === 200) {
      dispatch(loginSuccess(response.data));
    } else {
      dispatch(logout());
    }
  } catch (error) {
    console.error('Auth check failed:', error);
    dispatch(logout());
  }
};

// Selectors
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectUser = (state) => state.auth.user;
export const selectError = (state) => state.auth.error;

export default authSlice.reducer; 