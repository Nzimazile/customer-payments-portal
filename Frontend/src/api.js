import axios from 'axios';

const API_URL = 'https://localhost:443/apic';

export const registerUser = async (email, password) => {
  return axios.post(`${API_URL}/auth/register`, { email, password }).then(response => console.log('User signed up!', response.data))
  .catch(error => console.error('Signup error:', error));
};

export const loginUser = async (email, password) => {
  return axios.post(`${API_URL}/auth/login`, { email, password }).then(response => console.log('Login Succesful', response.data))
  .catch(error => console.error('Login error:', error));
};
