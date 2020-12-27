
import types from './types'

const initialState = {
    isLoading: false,
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.APP_LOADING:
            return {
                ...state,
                isLoading: action.payload.isLoading,
            };
            
        default: return state;
    }
}

export default appReducer;