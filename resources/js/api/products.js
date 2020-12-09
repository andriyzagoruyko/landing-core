import axios from 'axios';

const get = async (params) => {
    const result = await axios.get(`/api/admin/products?${params}`);

    return result.data;
}

const remove = async (id) => {
    let result;

    if (Array.isArray(id)) {
        result = await axios.post(`/api/admin/products/deletes`, JSON.stringify(id));
    } else {
        result = await axios.delete(`/api/admin/products/${id}`);
    }

    return result.data;
}

const create = async ({ ...data }) => {
    if (!data.saleEnabled) {
        delete data.sale;
        delete data.saleExpires;
    }

    const result = await axios.post('api/admin/products', data);

    return result.data;
}

export { get, remove, create }