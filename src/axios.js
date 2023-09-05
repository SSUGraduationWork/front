import axios from 'axios'
import store from "./store/index";

//Axios 인스턴스 생성 및 기본 설정
const axiosInstanceNode = axios.create({
    baseURL: 'http://44.219.162.63:3000'
})
const axiosInstanceSpring = axios.create({
    baseURL : 'http://localhost:3210'
})

axiosInstanceSpring.interceptors.request.use(
    (config) => {
        let access_token = store.state.userStore.jwtToken;
        if (access_token){
            config.headers.Authorization = `${access_token}`;
        }
        return config;
    }
)
axiosInstanceNode.interceptors.request.use(
    (config) => {
        let access_token = store.state.userStore.jwtToken;
        if (access_token){
            config.headers.Authorization = `${access_token}`;
        }
        return config;

    }
)

export { axiosInstanceNode, axiosInstanceSpring };