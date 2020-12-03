import { NOTICE_DISPLAY, NOTICE_FADE_OUT, NOTICE_REMOVE } from '../actionTypes/notices'

export const initialState = {
    messages: []
}

export const noticesReducer = (state = initialState, action) => {
    switch (action.type) {
        case NOTICE_DISPLAY:
            return {
                ...state,
                messages: state.messages.concat([action.payload])
            };

        case NOTICE_FADE_OUT:
            const newMessages = [...state.messages];
            const index = newMessages.findIndex(msg => msg.id === action.payload);
            newMessages[index] = { ...newMessages[index], show: false };

            return {
                ...state,
                messages: newMessages
            };

        case NOTICE_REMOVE:
            return {
                ...state,
                messages: state.messages.filter(msg => msg.id !== action.payload)
            };

        default: return state;
    }
}
