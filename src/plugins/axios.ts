import axios from "axios";

const BASE_URL = "";

const axiosInstance = axios.create({
    baseURL: `${BASE_URL}/api/`,
    timeout: 2000,
});

const getAxios = () => {
    return axiosInstance;
};

export default getAxios;
