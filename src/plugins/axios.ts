// import dev from '../script/dev'
import axios from 'axios'
import store from '../store/index';

const BASE_URL = true ? 'http://localhost:3000' : 'http://omenmc.hopto.org:3000';

console.log(store.getters.token);


const axiosInstance = axios.create({
    baseURL: `${BASE_URL}/api/`,
    timeout: 2000,
    headers: {
        Authorization: `Bearer ${store.getters.token}`
    }
})

const getAxios = () => {
    if (axiosInstance.defaults.headers.Authorization !== `Bearer ${store.getters.token}`) {
        axiosInstance.defaults.headers.Authorization = `Bearer ${store.getters.token}`
        return axiosInstance
    } else return axiosInstance
}


export default getAxios;
