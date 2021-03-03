const appendImages = (formData, images, isUpdate) => {
    images.forEach(({ id, file }) => {
        if (id) {
            formData.append('updateMedia[]', id);
        } else {
            formData.append('images[]', file);
            isUpdate && formData.append('updateMedia[]', file.name);
        }
    });
};

export const getFormData = (data) => {
    const formData = new FormData();
    const isUpdate = Boolean(data.id);

    isUpdate && formData.append('_method', 'PATCH');

    for (let item in data) {
        if (typeof data[item] === 'boolean' && !data[item]) {
            continue;
        }

        if (Array.isArray(data[item])) {
            if (item === 'images') {
                data[item] &&
                    appendImages(formData, data[item], isUpdate);
            } else {
                data[item].forEach((i) =>
                    formData.append(`${item}[]`, i),
                );
                continue;
            }
        }

        formData.append(item, data[item] === null ? '' : data[item]);
    }

    return formData;
};
