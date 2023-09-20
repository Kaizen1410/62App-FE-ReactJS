import fetchClient from "../utils/fetchClient";

export const login = async (body) => {
    const result = {
        data: null,
        token: null,
        error: null
    }

    try {
        const res = await fetchClient.post('/api/auth/login', body);
        result.data = res.data.data;
        result.token = res.data.token;
    } catch (err) {
        result.error = err.response?.data.message || 'Cant send data to server';
    }

    return result;
}

export const logout = async () => {
    const result = {
        message: null,
        error: null
    }

    try {
        const res = await fetchClient.get('/api/auth/logout');
        result.message = res.data.message;
    } catch (err) {
        result.error = err.response?.data.message || err;
    }

    return result;
}

export const getUser = async () => {
    const result = {
        data: null,
        error: null
    }

    try {
        const res = await fetchClient.get('/api/auth/user');
        result.data = res.data.data;
    } catch (err) {
        result.error = err.response?.data.message || err;
    }

    return result;

}