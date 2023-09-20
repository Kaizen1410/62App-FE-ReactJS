import fetchClient from "../utils/fetchClient"

export const getEmployees = async (search='', page=1, sort='name', direction='asc', perPage=999) => {
    const result = {
        data: null,
        pagination: null,
        error: null
    }

    try {
        const res = await fetchClient.get(`/api/employees?search=${search}&page=${page}&sort=${sort}&direction=${direction}&per_page=${perPage}`);
        result.data = res.data.data
        delete res.data.data
        result.pagination = res.data
    } catch (err) {
        result.error = err.response?.data.message || err
    }
    return result;
}

export const oneEmployee = async (id) => {
    const result = {
        data: null,
        error: null
    }

    try {
        const res = await fetchClient.get(`/api/employees/${id}`);
        result.data = res.data.data
    } catch (err) {
        result.error = err.response?.data.message || err
    }
    return result;
}

export const addEmployee = async (formData) => {
    const result = {
        data: null,
        message: null,
        error: null
    }

    try {
        const res = await fetchClient.post('/api/employees', formData, { headers: { "Content-Type": 'multipart/form-data' } });
        result.data = res.data.data
        result.message = res.data.message
    } catch (err) {
        result.error = err.response?.data.message || err
    }
    return result;
}

export const updateEmployee = async (id, formData) => {
    const result = {
        data: null,
        message: null,
        error: null
    }

    try {
        const res = await fetchClient.post(`/api/employees/${id}`, formData, { headers: { "Content-Type": 'multipart/form-data' } });
        result.data = res.data.data
        result.message = res.data.message
    } catch (err) {
        result.error = err.response?.data.message || err
    }
    return result;
}

export const deleteEmployee = async (id) => {
    const result = {
        message: null,
        error: null
    }

    try {
        const res = await fetchClient.delete(`/api/employee/${id}`);
        result.message = res.data.message
    } catch (err) {
        result.error = err.response?.data.message || err
    }
    return result;
}