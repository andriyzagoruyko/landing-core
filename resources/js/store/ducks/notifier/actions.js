import types from './types';
import { getRandomKey } from '~/helpers/';

export const enqueueSnackbar = (notification) => {
    const key = notification.options && notification.options.key;

    return {
        type: types.ENQUEUE_SNACKBAR,
        notification: {
            ...notification,
            key: key || getRandomKey(),
        },
    };
};

export const closeSnackbar = key => ({
    type: types.CLOSE_SNACKBAR,
    dismissAll: !key, // dismiss all if no key has been defined
    key,
});

export const removeSnackbar = key => ({
    type: types.REMOVE_SNACKBAR,
    key,
});

export default {
    enqueueSnackbar,
    closeSnackbar,
    removeSnackbar
}