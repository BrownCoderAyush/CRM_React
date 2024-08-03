import axios from "axios";

const axiosInstance = axios.create();
console.log(import.meta.env.VITE_BASE_URL,"url");
axiosInstance.defaults.baseURL = import.meta.env.VITE_BASE_URL;
axiosInstance.defaults.withCredentials = true;
axiosInstance.defaults.timeout = import.meta.env.VITE_TIMEOUT;

export default axiosInstance;
