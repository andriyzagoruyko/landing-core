import actions from './actions';

const addNotice = (text, type = 'info', lifeTime = 2000) => dispatch => {
    const id = new Date().getTime();
    const timerId = setTimeout(() => dispatch(fadeOutNotice(id)), lifeTime);

    dispatch(actions.displayNotice({ id, text, type, timerId, show: true }));
}

const removeNotice = (id) => (dispatch, getState) => {
    const messages = getState().notices.messages;
    const index = messages.findIndex(msg => msg.id === id);

    clearTimeout(messages[index].timerId);
    dispatch(actions.removeNotice(id));
}

const fadeOutNotice = (id) => actions.fadeOutNotice(id);

export default {
    addNotice,
    fadeOutNotice,
    removeNotice
}
