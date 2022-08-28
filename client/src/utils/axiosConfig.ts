import axios from "axios";
const backend_url = import.meta.env.VITE_BACKEND_URL;
const axiosConfig = axios.create({
  baseURL: backend_url,
  withCredentials: true,
  
});

export default axiosConfig;
