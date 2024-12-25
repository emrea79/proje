import axios from "axios";

const axiosBackendInstance = axios.create({
    baseURL: 'http://localhost:5001/',
});

export default axiosBackendInstance