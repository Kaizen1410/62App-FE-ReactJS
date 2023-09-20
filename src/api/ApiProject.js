import fetchClient from "../utils/fetchClient"

export const getProjects = async (search='', page=1, sort='name', direction='asc', perPage=999) => {
    const result = {
        data: null,
        pagination: null,
        error: null
    }

    try {
        const res = await fetchClient.get(`/api/projects?search=${search}&page=${page}&sort=${sort}&direction=${direction}&per_page=${perPage}`);
        result.data = res.data.data
        delete res.data.data
        result.pagination = res.data
    } catch (err) {
        result.error = err.response?.data.message || err
    }
    return result;
}

export const oneProject = async (id) => {
    const result = {
        data: null,
        error: null
    }

    try {
        const res = await fetchClient.get(`/api/projects/${id}`);
        result.data = res.data.data
    } catch (err) {
        result.error = err.response?.data.message || err
    }
    return result;
}

export const addProject = async (formData) => {
    const result = {
        data: null,
        message: null,
        error: null
    }

    try {
        const res = await fetchClient.post('/api/projects', formData, { headers: { "Content-Type": 'multipart/form-data' } });
        result.data = res.data.data
        result.message = res.data.message
    } catch (err) {
        result.error = err.response?.data.message || err
    }
    return result;
}

export const updateProject = async (id, formData) => {
    const result = {
        data: null,
        message: null,
        error: null
    }

    try {
        const res = await fetchClient.post(`/api/projects/${id}`, formData, { headers: { "Content-Type": 'multipart/form-data' } });
        result.data = res.data.data
        result.message = res.data.message
    } catch (err) {
        result.error = err.response?.data.message || err
    }
    return result;
}

export const deleteProject = async (id) => {
    const result = {
        message: null,
        error: null
    }

    try {
        const res = await fetchClient.delete(`/api/projects/${id}`);
        result.message = res.data.message
    } catch (err) {
        result.error = err.response?.data.message || err
    }
    return result;
}

export const getProjectsSummary = async (year) => {
    const result = {
        data: null,
        error: null
    }

    try {
        const res = await fetchClient.get(`/api/projects/summary?year=${year}`);
        result.data = res.data.data
    } catch (err) {
        result.error = err.response?.data.message || err
    }
    return result;
}