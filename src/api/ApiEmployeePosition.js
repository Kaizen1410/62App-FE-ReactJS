import fetchClient from "../utils/fetchClient"

export const getEmployeePositions = async (search='', page=1, sort='name', direction='asc', perPage=999) => {
    const result = {
        data: null,
        pagination: null,
        error: null
    }

    try {
        const res = await fetchClient.get(`/api/employee-positions?search=${search}&page=${page}&sort=${sort}&direction=${direction}&per_page=${perPage}`);
        result.data = res.data.data
        delete res.data.data
        result.pagination = res.data
    } catch (err) {
        result.error = err.response?.data.message || err
    }
    return result;
}

export const oneEmployeePosition = async (id) => {
    const result = {
        data: null,
        error: null
    }

    try {
        const res = await fetchClient.get(`/api/employee-positions/${id}`);
        result.data = res.data.data
    } catch (err) {
        result.error = err.response?.data.message || err
    }
    return result;
}

export const addEmployeePosition = async (body) => {
    const result = {
        data: null,
        message: null,
        error: null
    }

    try {
        const res = await fetchClient.post('/api/employee-positions', body);
        result.data = res.data.data
        result.message = res.data.message
    } catch (err) {
        result.error = err.response?.data.message || err
    }
    return result;
}

export const updateEmployeePosition = async (id, body) => {
    const result = {
        data: null,
        message: null,
        error: null
    }

    try {
        const res = await fetchClient.put(`/api/employee-positions/${id}`, body);
        result.data = res.data.data
        result.message = res.data.message
    } catch (err) {
        result.error = err.response?.data.message || err
    }
    return result;
}

export const deleteEmployeePosition = async (id) => {
    const result = {
        message: null,
        error: null
    }

    try {
        const res = await fetchClient.delete(`/api/employee-positions/${id}`);
        result.message = res.data.message
    } catch (err) {
        result.error = err.response?.data.message || err
    }
    return result;
}