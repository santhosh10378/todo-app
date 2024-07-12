import axios from "axios";

const backendURL = import.meta.env.VITE_BACKEND_URL;
console.log(backendURL);

const axiosClient = axios.create({
  baseURL: `${backendURL}/api`,
  withCredentials: true,
});

export default axiosClient;
