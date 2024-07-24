import axios from "axios";
import { toast } from "react-hot-toast";

export const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_ENDPOINT_URL,
    timeout: 30000
});

instance.interceptors.request.use(
    (defaultConfig) => {
        return defaultConfig;
    },
    (error) => {
        Promise.reject(error);
    }
);

instance.interceptors.response.use(
    (response) => response,
    async (error) => {
        toast.error(error.message);
        return error;
    }
);
