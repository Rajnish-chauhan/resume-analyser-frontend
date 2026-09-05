import axios from 'axios';

const API_BASE_URL = `${import.meta.env.VITE_URL}/api/resume`;

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
    
    // Clean up markdown formatting if the LLM wraps the JSON
    let rawString = response.data.atsReport;
    if (rawString.startsWith('```json')) {
      rawString = rawString.replace(/```json\n?/g, '').replace(/```\n?/g, '');
    }
    
    return JSON.parse(rawString);
  }
};