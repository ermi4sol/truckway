// src/services/api.js
import axios from 'axios';
import AuthService from './auth';

const API_URL = 'http://localhost:5000/api'; // Update this with your actual API URL

const ApiService = {
  // Transport Requests
  createTransportRequest: async (data) => {
    try {
      const response = await axios.post(`${API_URL}/transport-requests`, data, { headers: AuthService.authHeader() });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  getTransportRequests: async () => {
    try {
      const response = await axios.get(`${API_URL}/transport-requests`, { headers: AuthService.authHeader() });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  getTransportRequestById: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/transport-requests/${id}`, { headers: AuthService.authHeader() });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  updateTransportRequest: async (id, data) => {
    try {
      const response = await axios.put(`${API_URL}/transport-requests/${id}`, data, { headers: AuthService.authHeader() });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  deleteTransportRequest: async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/transport-requests/${id}`, { headers: AuthService.authHeader() });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  // Job Applications
  createJobApplication: async (data) => {
    try {
      const response = await axios.post(`${API_URL}/job-applications`, data, { headers: AuthService.authHeader() });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  getJobApplications: async () => {
    try {
      const response = await axios.get(`${API_URL}/job-applications`, { headers: AuthService.authHeader() });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  getJobApplicationById: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/job-applications/${id}`, { headers: AuthService.authHeader() });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  updateJobApplicationStatus: async (id, status) => {
    try {
      const response = await axios.put(`${API_URL}/job-applications/${id}/status`, { status }, { headers: AuthService.authHeader() });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
};

export default ApiService;