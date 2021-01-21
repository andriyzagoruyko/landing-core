import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLoading: false,
}

const { actions, reducer } = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setLoading(state, action) {
            state.isLoading = action.payload
        },
    },
});

export { reducer, actions }
