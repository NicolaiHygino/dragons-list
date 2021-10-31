import axios from 'axios';

export const apiURL = 'http://5c4b2a47aa8ee500142b4887.mockapi.io/api/v1/dragon';

export const api = axios.create({
  baseURL: apiURL,
});

export const apiGetAllDragons = async () => {
  return await api.get();
};

export const apiGetDragon = async (id) => {
  return await api.get(`/${id}`);
};

export const apiEditDragon = async (id, values) => {
  return await api.put(`/${id}`, values);
};

export const apiCreateNewDragon = async (values) => {
  return await api.post('', values);
};
