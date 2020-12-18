import axios from './createAxios';

const ENDPOINT = 'categories';

const all = async (params = '') => {
    const result = await axios.get(`${ENDPOINT}`);

    return result.data;
}

export { all };