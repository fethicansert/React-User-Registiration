import { axiosPrivate } from "../api/axios";
import { useEffect } from "react";
import useAuth from "./useAuth";
import useRefreshToken from "./useRefreshToken";


const useAxiosPrivate = () => {

  const refresh = useRefreshToken();
  const { auth } = useAuth();

  useEffect(() => {
    //Adding response interceptor

    axiosPrivate.interceptors.response.use(
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      //of no error send response
      response => response,
      (error) => {
        console.log(error);
        //Get the prev request we sent.
        const prevRequest = error?.config;

        if(error.response.status === 403 && !prevRequest?.sent){
          
        }
      }
    );
  }, []);

  return axiosPrivate;
}

export default useAxiosPrivate
