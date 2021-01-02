import axios from './createAxios';
import { plural } from '~/helpers/plural';

const getFormData = (data, isUpdate = false) => {
    let formData = new FormData();

    isUpdate && formData.append('_method', 'PATCH');

    for (let item in data) {
        if (typeof data[item] === 'boolean' && !data[item]) {
            continue;
        }
        if (item === 'images') {
            data[item] && appendImages(formData, data[item], isUpdate);
        } else {
            formData.append(item, data[item]);
        }
    }

    return formData;
}

const appendImages = (formData, images, isUpdate) => {
    images.forEach(({ id, file }) => {
        if (id) {
            formData.append('updateMedia[]', id);
        } else {
            formData.append('images[]', file);
            isUpdate && formData.append('updateMedia[]', file.name);
        }
    });
}

const api = (entityName, operation) => {
    const endpoint = plural(entityName, 2);

    switch (operation) {
        case 'get':
            return ({ params, multiple = false }) => (
                axios.get(multiple ? `${endpoint}?${params}` : `${endpoint}/${params}`)
            );

        case 'create':
            return ({ data }) => axios.post(endpoint, getFormData(data));

        case 'update':
            return ({ params, data }) => axios.post(`${endpoint}/${params}`, getFormData(data, true));

        case 'delete':
            return ({ params, multiple = false }) => multiple
                ? axios.post(`${endpoint}/deletes`, JSON.stringify(params))
                : axios.delete(`${endpoint}/${params[0]}`)
    }
}

export default api;
