import axios from 'axios';

const fetchClient = () => {
    const defaultOptions = {
        baseURL: 'http://10.10.10.221:8000',
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
    };

    // Create instance
    let instance = axios.create(defaultOptions);

    // Set the AUTH token for any request
    instance.interceptors.request.use(config => {
        const token = localStorage.getItem('token');
        config.headers.Authorization = token ? `Bearer ${token}` : '';
        return config;
    });

    return instance;
};

export default fetchClient();