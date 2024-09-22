// src/services/auth.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Update this with your actual API URL

const AuthService = {
  login: async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/login`, { email, password });
      if (response.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  register: async (name, email, password, role) => {
    try {
      const response = await axios.post(`${API_URL}/register`, { name, email, password, role });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  logout: () => {
    localStorage.removeItem('user');
  },

  getCurrentUser: () => {
    return JSON.parse(localStorage.getItem('user'));
  },

  authHeader: () => {
    const user = AuthService.getCurrentUser();
    if (user && user.token) {
      return { Authorization: `Bearer ${user.token}` };
    } else {
      return {};
    }
  }
};

export default AuthService;