import axios from 'axios';

export const instance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL || '',
});

instance.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        return Promise.reject(error.response.data);
    }
);

instance.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        /* eslint-disable  @typescript-eslint/no-explicit-any */
        let data: any = 'Something went wrong';
        if (error.response) {
            data = error.response.data;
        } else if (error.message) {
            data = error.message;
        }
        return Promise.reject(data);
    }
);

export default instance;
