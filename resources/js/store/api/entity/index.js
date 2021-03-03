import axios from '../createAxios';
import { plural } from '~/helpers/';
import { getFormData } from './helpers';

const get = async (entityName, { query, isMultiple }) => {
    const result = await axios.get(
        `${plural(entityName)}${isMultiple ? '?' : '/'}${query}`,
    );

    return result.data;
};

const create = async (entityName, { data }) => {
    const result = await axios.post(
        plural(entityName),
        getFormData(data),
    );
    return result.data;
};

const update = async (entityName, { query, data }) => {
    const result = await axios.post(
        `${plural(entityName)}/${query}`,
        getFormData(data),
    );
    return result.data;
};

const remove = async (entityName, { query, isMultiple }) => {
    const result = (await isMultiple)
        ? axios.post(
              `${plural(entityName)}/deletes`,
              JSON.stringify(query),
          )
        : axios.delete(`${plural(entityName)}/${query[0]}`);

    return result.data;
};

export { get, create, update, remove };
