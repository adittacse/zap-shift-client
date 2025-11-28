import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import AuthContext from "../contexts/AuthContext/AuthContext.jsx";
import Swal from "sweetalert2";

const axiosInstance = axios.create({
    baseURL: "http://localhost:3000"
});

const useAxiosSecure = () => {
    const { user, logOut } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        // request intercept
        const requestInterceptor = axiosInstance.interceptors.request.use((config) => {
            const token = user.accessToken;
            if (token) {
                config.headers.Authorization = `Bearer ${user?.accessToken}`;
                return config;
            }
        });

        // response interceptor
        const responseInterceptor = axiosInstance.interceptors.response.use(res => {
            return res;
        }, err => {
            const status = err.status;
            if (status === 401 || status === 403) {
                // log out the user for bad intention request
                logOut()
                    .then(() => {
                        navigate("/login");
                    })
                    .catch((error) => {
                        Swal.fire({
                            icon: "error",
                            title: "Oops...",
                            text: `${error.message}`,
                        });
                    });
            }
        });

        return () => {
            axiosInstance.interceptors.request.eject(requestInterceptor);
            axiosInstance.interceptors.response.eject(responseInterceptor);
        }
    }, [user, logOut, navigate]);

    return axiosInstance;
};

export default useAxiosSecure;