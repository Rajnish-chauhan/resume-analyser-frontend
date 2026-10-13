import axios from 'axios';

const envUrl = import.meta.env.VITE_URL;
const rawBase = envUrl && envUrl.trim().length > 0 ? envUrl : 'http://localhost:8080';
const cleanBase = rawBase.replace(/\/+$/, '');

const API_RESUME_URL = `${cleanBase}/api/resume`;
const API_AUTH_URL = `${cleanBase}/api/auth`;

export const adminApi = {
  login: async (username, password) => {
    const response = await axios.post(`${API_AUTH_URL}/login`, {
      username: username.trim(),
      password: password.trim()
    });

    if (response.data && response.data.success && response.data.token) {
      sessionStorage.setItem('admin_token', response.data.token);
      return response.data;
    }
    throw new Error(response.data?.message || 'Authentication failed');
  },

  logout: async () => {
    const token = sessionStorage.getItem('admin_token');
    try {
      if (token) {
        await axios.post(`${API_AUTH_URL}/logout`, {}, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
    } finally {
      sessionStorage.removeItem('admin_token');
    }
  },

  getToken: () => sessionStorage.getItem('admin_token'),

  getAllResumes: async () => {
    const token = sessionStorage.getItem('admin_token');
    const response = await axios.get(`${API_RESUME_URL}/all`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  },

  getPdfUrl: (gridFsId) => {
    return `${API_RESUME_URL}/view/${gridFsId}`;
  }
};

export const resumeApi = {
  analyzeAts: async (file, jd) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('jd', jd);

    const response = await axios.post(`${API_RESUME_URL}/analyseAts`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    if (response.data.error) {
      throw new Error(response.data.error);
    }

    let rawString = response.data.atsReport;
    if (typeof rawString === 'string') {
      if (rawString.startsWith('```json')) {
        rawString = rawString.replace(/```json\n?/g, '').replace(/```\n?/g, '');
      } else if (rawString.startsWith('```')) {
        rawString = rawString.replace(/```\n?/g, '');
      }
      return JSON.parse(rawString.trim());
    }

    return rawString;
  }
};