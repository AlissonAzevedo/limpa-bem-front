import axios from "axios";

const api = axios.create({
    baseURL: "https://web-production-7067.up.railway.app/api/"
});

export default api;