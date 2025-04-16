import axios from "axios";
import { BASE_URL } from "./apipath";

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 100000,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

// Request Interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("token");
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        return response; // Simply return the response if successful
    },
    (error) => {
        if (error.response) {
            if (error.response.status === 401) {
                window.location.href = "/login";
            } else if (error.response.status === 500) {
                console.error("Server Error");
            }
        } else if (error.code === "ECONNABORTED") {
            console.error("Timeout");
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
