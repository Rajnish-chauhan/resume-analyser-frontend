import axios from 'axios';

// Select API endpoint with automatic localhost fallback for offline development
const envUrl = import.meta.env.VITE_URL;
const rawBase = envUrl && envUrl.trim().length > 0 ? envUrl : 'http://localhost:8080';
const cleanBase = rawBase.replace(/\/+$/, '');
const API_BASE_URL = `${cleanBase}/api/resume`;

export const adminApi = {
  getAllResumes: async () => {
    const response = await axios.get(`${API_BASE_URL}/all`);
    return response.data;
  },
  getPdfUrl: (gridFsId) => {
    return `${API_BASE_URL}/view/${gridFsId}`;
  }
};

export const resumeApi = {
  analyzeAts: async (file, jd) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('jd', jd);

    const response = await axios.post(`${API_BASE_URL}/analyseAts`, formData, {
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