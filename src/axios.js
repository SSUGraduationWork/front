import axios from 'axios'
import store from "./store/index";
import router from './router/index';

//Axios 인스턴스 생성 및 기본 설정
const axiosInstanceNode = axios.create({
    baseURL: 'http://44.219.162.63:3000'
})
const axiosInstanceSpring = axios.create({
    baseURL : 'http://localhost:3210'
})
const axiosInstance = axios.create({

    baseURL : 'http://localhost:8001'

})

axiosInstanceSpring.interceptors.request.use(
    (config) => {
        let access_token = store.state.userStore.jwtToken;
        if (access_token){
            config.headers.Authorization = `Bearer ${access_token}`;
        }
        return config;
    }
)
axiosInstanceNode.interceptors.request.use(
    (config) => {
        let access_token = store.state.userStore.jwtToken;
        if (access_token){
            config.headers.Authorization = `Bearer ${access_token}`;
        }
        return config;

    }
)
axiosInstance.interceptors.request.use(
    (config) => {
        let access_token = store.state.userStore.jwtToken;
        if (access_token){
            config.headers.Authorization = `Bearer ${access_token}`;
        }
        return config;

    }
)
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if(error.response) {
            const status = error.response.status;
            if (status === 403){
                console.error('403 Forbidden: Access Denied');
                console.log(error.response.data.requestURI);
                router.push(`${error.response.data.requestURI}`);
            } else{
                console.error(`HTTP Error: ${status} ${error.response.statusText}`);
            }
        } else{
            console.error('Network Error: ', error.message);
        }
        return Promise.reject(error);
    }
)
export { axiosInstanceNode, axiosInstanceSpring, axiosInstance };