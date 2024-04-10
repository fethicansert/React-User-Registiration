import React from 'react';
import { useState, useEffect } from 'react';
import useRefreshToken from '../hooks/useRefreshToken';
import useAuth from '../hooks/useAuth';
import { Outlet } from 'react-router-dom';
const PersistLogin = () => {

    console.log("Persist Middleware");
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const { auth, persist } = useAuth();


    useEffect(() => {
        const verifyRefreshToken = async () => {
            console.log("Verify Refresh");
            try{
                await refresh(); //will return new(refreshed) accesstoken
            } catch(err) {
                console.log(err);
            } finally {
                setIsLoading(false);
            }
        };

        //if user has accessToken no need to verifyResresh
        //if not we can use refreshToken to verfiy user
        !auth?.accessToken && persist ? verifyRefreshToken() : setIsLoading(false);
    },[]);

  return (
    <>
        {   !persist
                ? <Outlet />
                : isLoading
                    ? <p>Loading...</p>
                    : <Outlet />
        }
    </>
  )
}

export default PersistLogin
