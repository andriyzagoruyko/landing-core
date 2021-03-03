import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoading: false,
    title: '',
};

const { actions, reducer } = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setLoading(state, action) {
            state.isLoading = action.payload;
        },
        setTitle(state, action) {
            state.title = action.payload;
        },
    },
});

export { reducer, actions };
