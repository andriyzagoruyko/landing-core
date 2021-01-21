import { createSlice } from '@reduxjs/toolkit'
import { getRandomKey } from '~/helpers/';

const initialState = {
    notifications: [],
};

const { actions, reducer } = createSlice({
    name: 'snackbar',
    initialState,
    reducers: {
        enqueueSnackbar: {
            reducer: (state, action) => {
                state.notifications = state.notifications.concat([{
                    key: action.key,
                    ...action.payload,
                }])
            },
            prepare: (notification) => ({ payload: { ...notification, key: getRandomKey() } }),
        },
        closeSnackbar: {
            reducer: (state, action) => {
                state.notifications = state.notifications.map(notification => (
                    (action.payload.dismissAll || notification.key === action.payload.key)
                        ? { ...notification, dismissed: true }
                        : { ...notification }
                ))
            },
            prepare: (key) => ({ payload: { key, dismissAll: !key } }),
        },
        removeSnackbar: {
            reducer: (state, action) => {
                state.notifications = state.notifications.filter(
                    notification => notification.key !== action.payload.key
                );
            },
            prepare: (key) => ({ payload: { key } }),
        },
    },
});

export { reducer, actions }
