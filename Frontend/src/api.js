import axios from 'axios';

const API_URL = 'https://localhost:443/apic';

export const registerUser = async (email, password) => {
  return axios.post(`${API_URL}/auth/register`, { email, password });
};

export const loginUser = async (email, password) => {
  return axios.post(`${API_URL}/auth/login`, { email, password });
};
