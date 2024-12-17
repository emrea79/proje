import axios from "axios";

const axiosUserInstance = axios.create({
    baseURL: 'http://localhost:5001/',
});

export default axiosUserInstance