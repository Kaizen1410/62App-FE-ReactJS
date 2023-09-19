import fetchClient from "../utils/fetchClient"

export const getRoles = async (search='', page=1, sort='name', direction='asc', perPage=999) => {
    const result = {
        data: null,
        pagination: null,
        error: null
    }

    try {
        const res = await fetchClient.get(`/api/roles?search=${search}&page=${page}&sort=${sort}&direction=${direction}&per_page=${perPage}`);
        result.data = res.data.data
        delete res.data.data
        result.pagination = res.data
    } catch (err) {
        result.error = err.response?.data.message
    }
    return result;
}

export const oneRole = async (id) => {
    const result = {
        data: null,
        error: null
    }

    try {
        const res = await fetchClient.get(`/api/roles/${id}`);
        result.data = res.data.data
    } catch (err) {
        result.error = err.response?.data.message
    }
    return result;
}

export const addRole = async (body) => {
    const result = {
        data: null,
        message: null,
        error: null
    }

    try {
        const res = await fetchClient.post('/api/roles', body);
        result.data = res.data.data
        result.message = res.data.message
    } catch (err) {
        result.error = err.response?.data.message
    }
    return result;
}

export const updateRole = async (id, body) => {
    const result = {
        data: null,
        message: null,
        error: null
    }

    try {
        const res = await fetchClient.put(`/api/roles/${id}`, body);
        result.data = res.data.data
        result.message = res.data.message
    } catch (err) {
        result.error = err.response?.data.message
    }
    return result;
}

export const deleteRole = async (id) => {
    const result = {
        message: null,
        error: null
    }

    try {
        const res = await fetchClient.delete(`/api/roles/${id}`);
        result.message = res.data.message
    } catch (err) {
        result.error = err.response?.data.message
    }
    return result;
}