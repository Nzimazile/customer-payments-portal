import axios from 'axios';

const API_URL = 'https://localhost:443/api/auth';

export const getCsrfToken = async () => {
  try {
    const response = await axios.get(`${API_URL}/get-csrf-token`);
    return response.data.csrfToken;
  } catch (error) {
    console.error('Error fetching CSRF token', error);
    throw error;
  }
};
export const loginUser = async (email, password) => {
  try {
    const csrfToken = await getCsrfToken();
    console.log(csrfToken);
    const response = await axios.post(`${API_URL}/login`, { email, password },{headers: {'CSRF-Token' : csrfToken}});
    return response.data;
  } catch (error) {
    console.error('Error logging in', error);
    throw error;
  }
};
