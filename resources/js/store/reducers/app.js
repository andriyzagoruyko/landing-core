import { APP_LOADING } from '../actionTypes/app'

export const initialState = {
    isLoading: false
}

export const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case APP_LOADING:
            return {
                ...state,
                isLoading: action.payload
            };

        default: return state;
    }
}
