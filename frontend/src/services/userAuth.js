import axios from 'axios';
const baseUrl = 'http://localhost:3001/api/user';

const registration = async (newObject) => {
  const response = await axios.post(`${baseUrl}/registration`, newObject);
  return response;
};
const login = async (newObject) => {
  const response = await axios.post(`${baseUrl}/login`, newObject);
  return response;
};

const adminLogin = async (newObject) => {
  const response = await axios.post(`${baseUrl}/adminlogin`, newObject);
  return response;
};

export default {
  registration: registration,
  login: login,
  adminLogin: adminLogin,
};
