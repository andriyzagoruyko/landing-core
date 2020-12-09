import { NOTICE_DISPLAY } from '../actionTypes/notices'
import { NOTICE_FADE_OUT } from '../actionTypes/notices'
import { NOTICE_REMOVE } from '../actionTypes/notices'

export const addNotice = (text, type = 'info', lifeTime = 2000) => dispatch => {
    const id = new Date().getTime();
    const timerId = setTimeout(() => dispatch(fadeOutNotice(id)), lifeTime);

    dispatch(displayNotice({ id, text, type, timerId, show: true }));
}

export const displayNotice = notice => {
    return {
        type: NOTICE_DISPLAY,
        payload: notice
    }
}

export const fadeOutNotice = id => {
    return {
        type: NOTICE_FADE_OUT,
        payload: id
    }
}

export const removeNotice = (id) => (dispatch, getState) => {
    const messages = getState().notices.messages;
    const index = messages.findIndex(msg => msg.id === id);

    clearTimeout(messages[index].timerId);
    dispatch({ type: NOTICE_REMOVE, payload: id })
}


