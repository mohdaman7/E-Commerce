import axios from 'axios';

// Create an axios instance with the base URL from environment variables
const userApi = axios.create({
    baseURL: import.meta.env.VITE_USER_URL
});
userApi.interceptors.request.use(
    (config) => {
        // Add an authorization token if available (optional)
        const token = localStorage.getItem('tocken');
        
        if (token) {
            config.headers.authorization = `Bearer ${token}`;
        }
        // Log request details
        console.log('Request:', config);
        return config;
    },
    (error) => {
        console.error('Request error:', error);
        return Promise.reject(error);
    }
);

// Response Interceptor: Handles success and errors for responses
userApi.interceptors.response.use(
    (response) => {
        // Handle the response data
        console.log('Response:', response);
        return response;
    },
    (error) => {
        console.error('Response error:', error);
        
        // Optional: Custom error handling
        if (error.response && error.response.status === 401) {
            // Redirect to login page if unauthorized
            // window.location.href = '/login';
        }

        return Promise.reject(error);
    }
);

export default userApi;