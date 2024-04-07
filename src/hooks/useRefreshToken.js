import React, { useEffect } from 'react'
import useAuth from './useAuth'
import axios from '../api/axios';

const REFRESH_URL = 'refresh';
const useRefreshToken = () => {

    const { setAuth, auth } = useAuth();

   
    const refresh = async () => {
        
        const headerList = {
            'Accept': "application/json"
        };

        try {

            const response = await axios.get(REFRESH_URL, {
                headers: headerList,
                withCredentials: true
            });
            const token = response.data.accessToken;
            setAuth(prevAuth => {
                // console.log(prevAuth);
                // console.log({ ...prevAuth, accessToken: token });
                return { ...prevAuth, accessToken: token };
            });

            console.log("AccesToken Refreshed");

            return token;

        } catch (err) {
            console.log(err);
        }
    };

    return refresh;
}

export default useRefreshToken
