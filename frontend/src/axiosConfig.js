import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://subscription-cyan.vercel.app/api', // Replace with your Vercel URL
});

// Set the token for each request
const setAuthToken = (token) => {
    if (token) {
        instance.defaults.headers.common['Authorization'] = token;
    } else {
        delete instance.defaults.headers.common['Authorization'];
    }
};

export { instance, setAuthToken };