import React from 'react'
import axios from '../api/axios';
import useAuth from './useAuth';

const LOGOUT_URL = '/logout'

//user logout process
const useLogut = () => {

    const { setAuth, setPersist } = useAuth();

    const logout = async () => {
        try{
            const response = await axios.post(LOGOUT_URL, {}, {
                withCredentials: true //should be true to send cookies with request
            });
            //Clear auth context
            setAuth({});
            setPersist(false);
            localStorage.setItem('persist', false);
        } catch(err) {
            console.log(err);
        }
    } 
    return logout
}

export default useLogut
