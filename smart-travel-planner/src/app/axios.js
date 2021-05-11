import Axios from "axios";

const axios = Axios.create({
  baseURL: "http://localhost:5000",
});

// Interceptors to attach token on request and logout on error 401 and 403
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers["x-auth-token"] = token;
    return config;
  },
  (err) => Promise.reject(err)
);

axios.interceptors.response.use(
  (res) => res,
  (err) => {
    const status = err.status || err.response.status;
    if (status === 401 || status === 403) {
      if (
        localStorage.getItem("token") ||
        localStorage.getItem("token")?.length === 0
      ) {
        localStorage.removeItem("token");
        window.location.assign("/login");
      }
    }

    return Promise.reject(err);
  }
);

export default axios;
