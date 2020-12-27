import types from './types';

const initialState = {
    messages: []
}

const noticesReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.NOTICE_DISPLAY:
            return {
                ...state,
                messages: state.messages.concat([action.payload])
            };

        case types.NOTICE_FADE_OUT:
            const newMessages = [...state.messages];
            const index = newMessages.findIndex(msg => msg.id === action.payload);
            newMessages[index] = { ...newMessages[index], show: false };

            return {
                ...state,
                messages: newMessages
            };

        case types.NOTICE_REMOVE:
            return {
                ...state,
                messages: state.messages.filter(msg => msg.id !== action.payload)
            };

        default: return state;
    }
}

export default noticesReducer