import axios from "axios";

const appApi = axios.create({
    baseURL: 'http://localhost:8000/api'
});

appApi.interceptors.request.use((config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default appApi;