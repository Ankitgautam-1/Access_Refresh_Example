import { AxiosError } from "axios";
import React, { useEffect } from "react";
import axiosConfig from "../utils/axiosConfig";

const useRefreshToken = () => {
  useEffect(() => {
    const requestIntercept: any = axiosConfig.interceptors.request.use(
      (res) => {
        return res;
      },
      (err) => {
        return Promise.reject(err);
      }
    );
    const responseIntercept: any = axiosConfig.interceptors.response.use(
      (res) => {
        return res;
      },
      async (error) => {
        const err = error as AxiosError;
        if (err && err.response && err.response.status === 403) {
          console.log("unAuth:");
          await axiosConfig.get("/api/v1/refreshToken");
          const prevRequest = err.config;
          return axiosConfig(prevRequest);
        }
        // window.location.href = "/";
        return Promise.reject(error);
      }
    );
    return () => {
      axiosConfig.interceptors.request.eject(requestIntercept);
      axiosConfig.interceptors.response.eject(responseIntercept);
    };
  }, []);
  return axiosConfig;
};

export default useRefreshToken;
