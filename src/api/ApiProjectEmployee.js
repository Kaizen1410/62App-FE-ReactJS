import fetchClient from "../utils/fetchClient"

export const getProjectEmployees = async (search='', page=1, sort='name', direction='asc', perPage=999) => {
    const result = {
        data: null,
        pagination: null,
        error: null
    }

    try {
        const res = await fetchClient.get(`/api/project-employees?search=${search}&page=${page}&sort=${sort}&direction=${direction}&per_page=${perPage}`);
        result.data = res.data.data
        delete res.data.data
        result.pagination = res.data
    } catch (err) {
        result.error = err.response?.data.message || err
    }
    return result;
}

export const oneProjectEmployee = async (id) => {
    const result = {
        data: null,
        error: null
    }

    try {
        const res = await fetchClient.get(`/api/project-employees/${id}`);
        result.data = res.data.data
    } catch (err) {
        result.error = err.response?.data.message || err
    }
    return result;
}

export const addProjectEmployee = async (body) => {
    const result = {
        data: null,
        message: null,
        error: null
    }

    try {
        const res = await fetchClient.post('/api/project-employees', body);
        result.data = res.data.data
        result.message = res.data.message
    } catch (err) {
        result.error = err.response?.data.message || err
    }
    return result;
}

export const updateProjectEmployee = async (id, body) => {
    const result = {
        data: null,
        message: null,
        error: null
    }

    try {
        const res = await fetchClient.put(`/api/project-employees/${id}`, body);
        result.data = res.data.data
        result.message = res.data.message
    } catch (err) {
        result.error = err.response?.data.message || err
    }
    return result;
}

export const deleteProjectEmployee = async (id) => {
    const result = {
        message: null,
        error: null
    }

    try {
        const res = await fetchClient.delete(`/api/project-employees/${id}`);
        result.message = res.data.message
    } catch (err) {
        result.error = err.response?.data.message || err
    }
    return result;
}