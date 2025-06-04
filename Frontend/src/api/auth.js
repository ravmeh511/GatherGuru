import api from './axios';

export const authAPI = {
  login: async (credentials) => {
    const response = await api.post('/admin/login', credentials);
    return response.data;
  },
  
  logout: async () => {
    const response = await api.post('/admin/logout');
    return response.data;
  },
  
  getProfile: async () => {
    const response = await api.get('/admin/profile');
    return response.data;
  },
  
  updateProfile: async (data) => {
    const response = await api.put('/admin/profile', data);
    return response.data;
  }
}; 