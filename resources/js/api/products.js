import axios from './createAxios';

const all = async (params) => {
    const result = await axios.get(`products?${params}`);

    return result.data;
}

const get = async (id) => {
    const result = await axios.get(`products/${id}`);

    return result.data;
}


const remove = async (id) => {
    let result;

    if (Array.isArray(id)) {
        result = await axios.post(`products/deletes`, JSON.stringify(id));
    } else {
        result = await axios.delete(`products/${id}`);
    }

    return result.data;
}

const create = async (data) => {
    if (!data.saleEnabled) {
        delete data.sale;
        delete data.saleExpires;
    }

    let ProductFormData = new FormData();

    for (let item in data) {
        if (item === 'images') {
            data[item] && data[item].forEach(image => ProductFormData.append('images[]', image.file));
        } else {
            ProductFormData.append(item, data[item]);
        }
    }

    const result = await axios.post('products', ProductFormData);

    return result.data;
}

const update = async (id, data) => {
    let ProductFormData = new FormData();

    ProductFormData.append('_method', 'PATCH');

    for (let item in data) {
        if (item === 'images') {
            data[item] && data[item].forEach(({ id, file }) => {
                if (id) {
                    ProductFormData.append('updateMedia[]', id);
                } else  {
                    ProductFormData.append('images[]', file);
                    ProductFormData.append('updateMedia[]', file.name);
                }
            });
        } else {
            ProductFormData.append(item, data[item]);
        }
    }

    const result = await axios.post(`products/${id}`, ProductFormData);

    return result.data;
}

export { all, get, remove, create, update }