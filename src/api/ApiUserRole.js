import fetchClient from "../utils/fetchClient"

export const getUserRoles = async (search='', page=1, sort='email', direction='asc', perPage=999) => {
    const result = {
        data: null,
        pagination: null,
        error: null
    }

    try {
        const res = await fetchClient.get(`/api/user-roles?search=${search}&page=${page}&sort=${sort}&direction=${direction}&per_page=${perPage}`);
        result.data = res.data.data
        delete res.data.data
        result.pagination = res.data
    } catch (err) {
        result.error = err.response?.data.message
    }
    return result;
}

export const oneUserRole = async (id) => {
    const result = {
        data: null,
        error: null
    }

    try {
        const res = await fetchClient.get(`/api/user-roles/${id}`);
        result.data = res.data.data
    } catch (err) {
        result.error = err.response?.data.message
    }
    return result;
}

export const updateUserRole = async (id, body) => {
    const result = {
        data: null,
        message: null,
        error: null
    }

    try {
        const res = await fetchClient.put(`/api/-user-roles/${id}`, body);
        result.data = res.data.data
        result.message = res.data.message
    } catch (err) {
        result.error = err.response?.data.message
    }
    return result;
}