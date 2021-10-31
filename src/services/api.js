import axios from 'axios';

export const apiURL = 'http://5c4b2a47aa8ee500142b4887.mockapi.io/api/v1/dragon';

export const api = axios.create({
  baseURL: apiURL,
});

export const getAllDragons = async () => {
  return await api.get();
};

export const getDragon = async (id) => {
  return await api.get(`/${id}`);
};
