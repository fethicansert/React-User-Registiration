import React, { useEffect } from 'react'
import useAuth from './useAuth'
import axios from '../api/axios';

const REFRESH_URL = 'refresh';
const useRefreshToken = () => {

    const { setAuth, auth } = useAuth();

   
    const refresh = async () => {
        
        try {

            const response = await axios.get(REFRESH_URL, {
                withCredentials: true
            });
            const accessToken = response.data.accessToken;
            const roles  = response.data.roles;
            const user  = response.data.user;
            setAuth(prevAuth => {
                // console.log(prevAuth);
                // console.log({ ...prevAuth, accessToken: token });
                return { ...prevAuth, accessToken, roles, user };
            });
            
            return accessToken;

        } catch (err) {
            console.log(err);
        }
    };

    return refresh;
}

export default useRefreshToken
