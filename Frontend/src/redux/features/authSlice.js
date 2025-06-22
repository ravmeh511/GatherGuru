// redux/features/authSlice.js
import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

const getInitialUser = () => {
  const token = Cookies.get('token');
  if (token) {
    try {
      const decoded = jwtDecode(token);
      const isExpired = decoded.exp * 1000 < Date.now();
      if (!isExpired) {
        return {
          id: decoded.id,
          role: decoded.role
        };
      }
      Cookies.remove('token');
    } catch (err) {
      console.error('Invalid token:', err);
      Cookies.remove('token');
    }
  }
  return null;
};

const user = getInitialUser();

const initialState = {
  token: Cookies.get('token') || null,
  role: user?.role || null,
  isAuthenticated: !!user,
  user: user || null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      const { token, role, userData } = action.payload;
      state.token = token;
      state.role = role;
      state.isAuthenticated = true;
      state.user = { ...userData, role };
    },
    logout: (state) => {
      state.token = null;
      state.role = null;
      state.isAuthenticated = false;
      state.user = null;
      Cookies.remove('token');
    },
    setUser: (state, action) => {
      state.user = action.payload;
    }
  }
});

export const { login, logout, setUser } = authSlice.actions;
export default authSlice.reducer;
