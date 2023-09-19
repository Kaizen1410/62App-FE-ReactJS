import fetchClient from "../utils/fetchClient"

export const getEmployees = async ({search='', page=1, sort='name', direction='asc', perPage=999}) => {
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
        result.error = err.response?.data.message
    }
    return result;
}