import axios from 'axios';
const baseUrl = 'http://localhost:3001/api/tasks';

let token = null;
const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = async () => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.get(baseUrl, config);
  return response;
};

const createNewTask = async (newObject) => {
  console.log(`Token: ${token}`);
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(`${baseUrl}/new`, newObject, config);
  return response;
};

const completeTask = async (id, newObject) => {
  const response = await axios.put(`${baseUrl}/done/${id}`, newObject);
  return response;
};

const editTask = async (id, newObject) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.put(`${baseUrl}/${id}`, newObject, config);
  return response;
};

const deleteTask = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`);
  return response;
};

export default {
  getAll: getAll,
  createNewTask: createNewTask,
  completeTask: completeTask,
  deleteTask: deleteTask,
  editTask: editTask,
  setToken: setToken,
};
