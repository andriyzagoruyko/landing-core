import axios from './createAxios';

const ENDPOINT = 'products';

const all = async (params) => {
    const result = await axios.get(`${ENDPOINT}?${params}`);

    return result.data;
}

const get = async (id) => {
    const result = await axios.get(`${ENDPOINT}/${id}`);

    return result.data;
}

const remove = async (id) => {
    let result;

    if (Array.isArray(id)) {
        result = await axios.post(`${ENDPOINT}/deletes`, JSON.stringify(id));
    } else {
        result = await axios.delete(`${ENDPOINT}/${id}`);
    }

    return result.data;
}

const create = async (data) => {
    let ProductFormData = new FormData();

    for (let item in data) {
        if (typeof data[item] === 'boolean' && !data[item]) {
            continue;
        }

        if (item === 'images') {
            data[item] && data[item].forEach(image => ProductFormData.append('images[]', image.file));
        } else {
            ProductFormData.append(item, data[item]);
        }
    }

    const result = await axios.post(`${ENDPOINT}`, ProductFormData);

    return result.data;
}

const update = async (id, data) => {
    let ProductFormData = new FormData();

    console.log(data);

    ProductFormData.append('_method', 'PATCH');

    for (let item in data) {
        if (typeof data[item] === 'boolean' && !data[item]) {
            continue;
        }

        if (item === 'images') {
            data[item] && data[item].forEach(({ id, file }) => {
                if (id) {
                    ProductFormData.append('updateMedia[]', id);
                } else {
                    ProductFormData.append('images[]', file);
                    ProductFormData.append('updateMedia[]', file.name);
                }
            });
        } else {
            ProductFormData.append(item, data[item]);
        }
    }

    const result = await axios.post(`${ENDPOINT}/${id}`, ProductFormData);

    return result.data;
}

export { all, get, remove, create, update }