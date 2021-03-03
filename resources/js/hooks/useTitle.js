import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ucFirst } from '~/helpers';
import { actions } from '~s/modules/app';

const useTitle = (str) => {
    const dispatch = useDispatch();
    const title = ucFirst(str || '');

    useEffect(() => {
        document.title = title;
        dispatch(actions.setTitle(title));
    }, [title]);
};

export default useTitle;
