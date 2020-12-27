import axios from '~/api/createAxios';
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

const getRequestConfig = (method, entity, params, multiple) => {
    const entityName = plural(entity, 2);

    let url = '', data = {};

    switch (method) {
        case 'GET':
            url = multiple
                ? `${entityName}?${params}`
                : `${entityName}/${params}`;
            break;

        case 'POST':
            url = entityName;
            data = getFormData(params);
            break;

        case 'PATCH':
            url = `${entityName}/${params}`;
            method = 'POST';
            break;

        case 'DELETE':
            if (multiple) {
                url = `${entityName}/deletes`;
                data = JSON.stringify(params);
                method = 'POST';
            } else {
                url = `${entityName}/${params[0]}`;
            }
            break;
    }

    return { url, method, data }
}

export const request = async (method, entity, params, multiple = false) => {
    const config = getRequestConfig(method, entity, params, multiple);
    const result = await axios.request(config);
    
    return result.data;
}
