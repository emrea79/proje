import axios from "axios";

const axiosBackendInstance = axios.create({
    baseURL: 'http://localhost:5001/',
    withCredentials: true,
    headers: {
        'Access-Control-Allow-Origin': "true",
        crossorigin: true
    }
});

export default axiosBackendInstance