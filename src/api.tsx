// api.js
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000', // Set your base URL here
});

export default api;
