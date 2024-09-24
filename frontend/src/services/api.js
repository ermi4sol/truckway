
import axios from 'axios';

const API_URL = 'http://truckway.netlify.app/api'; // Update this with your actual API URL

const getAuthHeader = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user && user.token) {
    return { Authorization: `Bearer ${user.token}` };
  } else {
    return {};
  }
};

const ApiService = {
  // Transport Requests
  createTransportRequest: async (data) => {
    try {
      const response = await axios.post(`${API_URL}/transport-requests`, data, { headers: getAuthHeader() });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  getTransportRequests: async () => {
    try {
      const response = await axios.get(`${API_URL}/transport-requests`, { headers: getAuthHeader() });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  getTransportRequestById: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/transport-requests/${id}`, { headers: getAuthHeader() });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  updateTransportRequest: async (id, data) => {
    try {
      const response = await axios.put(`${API_URL}/transport-requests/${id}`, data, { headers: getAuthHeader() });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  deleteTransportRequest: async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/transport-requests/${id}`, { headers: getAuthHeader() });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Job Applications
  createJobApplication: async (data) => {
    try {
      const response = await axios.post(`${API_URL}/job-applications`, data, { headers: getAuthHeader() });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  getJobApplications: async () => {
    try {
      const response = await axios.get(`${API_URL}/job-applications`, { headers: getAuthHeader() });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  getJobApplicationById: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/job-applications/${id}`, { headers: getAuthHeader() });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  updateJobApplicationStatus: async (id, status) => {
    try {
      const response = await axios.put(`${API_URL}/job-applications/${id}/status`, { status }, { headers: getAuthHeader() });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};

export default ApiService;