import { axiosPrivate } from "../api/axios";
import { useEffect } from "react";
import useAuth from "./useAuth";
import useRefreshToken from "./useRefreshToken";

//We give some powers to private axios instance with useAxiosPrivate hook
const useAxiosPrivate = () => {

  const refresh = useRefreshToken();
  const { auth } = useAuth();


  useEffect(() => {
  
    //Create request interceptor.
    const requestInterceptor = axiosPrivate.interceptors.request.use(

      // config == current request
      async (config) => { 

        //check if authorization header exist if not add header before request sent.
        if(!config.headers['Authorization']) { 
          config.headers['Authorization'] = `Bearer ${auth.accessToken}`;
        };

        return config; 
      }, 
      (error) => Promise.reject(error) 
    );

    //Create response interceptor.
    const responseInterceptor = axiosPrivate.interceptors.response.use(
      
      response => response, 
      async (error) => {

        //Get the prev request we sent.
        const prevRequest = error?.config;
        
        //Chech if response 403(Forbiden) and if request was sented again.
        if((error.response.status === 403) && (!prevRequest?.sent)){ //prevRequest.sent ile tek bir kez refreshlemeye calistigima emin oluyoruz
          prevRequest.sent = true;

          //refresh timeout token with refreshed token.
          const accessToken = await refresh();

          //set new token to request header and send request again.
          prevRequest.headers['Authorization'] = `Bearer ${accessToken}`;
          return axiosPrivate(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    //Clean interceptors at unmounted state.
    return () => {
      axiosPrivate.interceptors.response.eject(responseInterceptor);
      axiosPrivate.interceptors.request.eject(requestInterceptor);
    };
  }, [auth, refresh]); //auth, refresh why ?

  return axiosPrivate;
}

export default useAxiosPrivate
