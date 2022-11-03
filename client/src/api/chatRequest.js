import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });
export const createChat = (data) => API.post("/chat", data);
export const userChats = (userId) => API.get(`/chat/${userId}`);
export const findChat = (firstId, secondId) =>
  API.get(`/chat/find/${firstId}/${secondId}`);
