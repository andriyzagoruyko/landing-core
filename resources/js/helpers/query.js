const queryString = require('query-string');

const queryStringConfig = {
    parseNumbers: true,
    arrayFormat: 'separator',
    arrayFormatSeparator: ';',
    skipEmptyString: true
}

export const parseQuery = (locationSearch) => {
    return queryString.parse(locationSearch, queryStringConfig);
}

export const stringifyQuery = (params, config = {}) => {
    const stringifyConfig = {
        ...queryStringConfig,
        ...config
    }
    
    return queryString.stringify({ ...params }, stringifyConfig);
}

export const composeQuery = (locationSearch, params) => {
    return stringifyQuery({ ...parseQuery(locationSearch), ...params });
}