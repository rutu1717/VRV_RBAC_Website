import axios, {InternalAxiosRequestConfig } from "axios";
const API_URL = 'https://vrv-rbac-website.onrender.com/api';
const api = axios.create({
    baseURL:API_URL,
    headers:{
        'Content-Type':'application/json',
    }
});
api.interceptors.request.use((config:InternalAxiosRequestConfig)=>{
    const token = localStorage.getItem('token');
    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})

export default api;
