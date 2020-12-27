import types from './types'

const displayNotice = notice => ({
    type: types.NOTICE_DISPLAY,
    payload: notice
});

const fadeOutNotice = id => ({
    type: types.NOTICE_FADE_OUT,
    payload: id
});

const removeNotice = id => ({
    type: types.NOTICE_REMOVE,
    payload: id
});

export default {
    displayNotice,
    fadeOutNotice,
    removeNotice
}


