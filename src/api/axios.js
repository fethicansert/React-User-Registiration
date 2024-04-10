import axios from 'axios';
import useRefreshToken from '../hooks/useRefreshToken';

const BASE_URL =  'http://localhost:3166'

//Create axios instance for public requests => register login logout refresh
export default axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
});

//Create private axios instance for JWT verify needed requets => get post pu delete users 
//Headers will attach in every request 
export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type" : "application/json",
        "Accept": "application/json",
        "Authorization": ""
    },
    withCredentials: true
});


