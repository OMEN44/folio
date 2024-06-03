import axios from "axios";
import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();

const BASE_URL = import.meta.env.VITE_API_DEV === "true" ? "http://localhost:3000" : "https://huon.dev";

const axiosInstance = axios.create({
    baseURL: `${BASE_URL}/api/`,
    timeout: 2000,
});

const getAxios = () => {
    axiosInstance.defaults.headers.Authorization = `Bearer ${cookies.get("authToken")}`;
    return axiosInstance;
};

export default getAxios;
