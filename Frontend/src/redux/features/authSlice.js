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
      if (!isExpired) return decoded;
      Cookies.remove('token');
    } catch (err) {
      console.error('Invalid token');
      Cookies.remove('token');
    }
  }
  return null;
};

const user = getInitialUser();

const initialState = {
  user: user,
  isLoggedIn: !!user,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
      if (action.payload.token) {
        Cookies.set('token', action.payload.token, {
          secure: true,
          sameSite: 'Strict',
        });
      }
    },
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      Cookies.remove('token');
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
