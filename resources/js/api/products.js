import axios from 'axios';

const get = async () => {
    const result = await axios.get('/api/admin/products');

    return result.data;
}

const remove = (id) => {
    if (Array.isArray(id)) {
        return axios.post('/api/admin/products/deletes', JSON.stringify(id));
    }

    return axios.delete(`/api/admin/products/${id}`);
}

const create = async ({...data}) => {
    if (!data.saleEnabled) {
        delete data.sale;
        delete data.saleExpires;
    }

    const result = await axios.post('api/admin/products', data);

    return result.data;
}

export { get, remove, create }