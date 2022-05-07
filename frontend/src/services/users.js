import axios from 'axios';
const baseUrl = 'http://localhost:3001/api/admin';

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response;
};

const deleteUser = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`);
  return response;
};

const editUser = async (id, newObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, newObject);
  return response;
};

export default {
  getAll: getAll,
  deleteUser: deleteUser,
  editUser: editUser,
};
