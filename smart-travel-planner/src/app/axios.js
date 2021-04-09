import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:5000",
});

const BASE_URL = "http://localhost:5000";

export const postRequest = async (url, body = {}) => {
  const response = await fetch(BASE_URL + url, {
    method: "POST",
    mode: "cors",
    credentials: "same-origin",
    headers: { "Content-Type": "application/json" },
    body: body,
  });
  return response.json();
};

export const getRequest = async (url) => {
  const response = await fetch(BASE_URL + url, {
    method: "GET",
    mode: "cors",
    credentials: "same-origin",
    headers: { "Content-Type": "application/json" },
  });
  return response.json();
};
