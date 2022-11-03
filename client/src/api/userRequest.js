import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });
export const getUser = (id) => API.get(`user/${id}`);
export const getAllUser = () => API.get(`user`);
export const updateUser = (id, data) => API.put(`user/${id}`, { data });
export const followUser = (id, data) => API.put(`user/${id}/follow`, { data });
export const unfollowUser = (id, data) =>
  API.put(`user/${id}/unfollow`, { data });
