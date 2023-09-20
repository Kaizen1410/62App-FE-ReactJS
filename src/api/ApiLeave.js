import fetchClient from "../utils/fetchClient"

export const getLeaves = async (search = '', page = 1, sort = 'date_leave', direction = 'desc', perPage = 999) => {
    const result = {
        data: null,
        pagination: null,
        error: null
    }

    try {
        const res = await fetchClient.get(`/api/leaves?search=${search}&page=${page}&sort=${sort}&direction=${direction}&per_page=${perPage}`);
        result.data = res.data.data
        delete res.data.data
        result.pagination = res.data
    } catch (err) {
        result.error = err.response?.data.message || err
    }
    return result;
}

export const oneLeave = async (id) => {
    const result = {
        data: null,
        error: null
    }

    try {
        const res = await fetchClient.get(`/api/leaves/${id}`);
        result.data = res.data.data;
    } catch (err) {
        result.error = err.response?.data.message || err;
    }
    return result;
}

export const addLeave = async (body) => {
    const result = {
        data: null,
        message: null,
        error: null
    }

    try {
        const res = await fetchClient.post('/api/leaves', body);
        result.data = res.data.data;
        result.message = res.data.message;
    } catch (err) {
        result.error = err.response?.data.message || err;
    }
    return result;
}

export const updateLeave = async (id, body) => {
    const result = {
        data: null,
        message: null,
        error: null
    }

    try {
        const res = await fetchClient.put(`/api/leaves/${id}`, body);
        result.data = res.data.data;
        result.message = res.data.message;
    } catch (err) {
        result.error = err.response?.data.message || err;
    }
    return result;
}

export const deleteLeave = async (id) => {
    const result = {
        message: null,
        error: null
    }

    try {
        const res = await fetchClient.delete(`/api/leaves/${id}`);
        result.message = res.data.message;
    } catch (err) {
        result.error = err.response?.data.message || err;
    }
    return result;
}

export const importLeave = async (formData) => {
    const result = {
        message: null,
        error: null
    }

    try {
        const res = await fetchClient.post('/api/leaves/import', formData, { headers: { "Content-Type": 'multipart/form-data' } });
        result.message = res.data.message;
    } catch (err) {
        result.error = err.response?.data.message || err;
    }
    return result;
}

export const getLeavesSummary = async (year) => {
    const result = {
        data: null,
        error: null
    }

    try {
        const res = await fetchClient.get(`/api/leaves/summary/${year}`);
        result.data = res.data.data;
    } catch (err) {
        result.error = err.response?.data.message || err;
    }
    return result;
}

export const getLeavesCalendar = async () => {
    const result = {
        data: null,
        error: null
    }

    try {
        const res = await fetchClient.get('/api/leaves/calendar');
        result.data = res.data.data;
    } catch (err) {
        result.error = err.response?.data.message || err;
    }

    return result;
}