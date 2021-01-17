import { useEffect } from 'react';
import { ucFirst } from '~/helpers';

const useTitle = (title) => {
    useEffect(() => {
        document.title = ucFirst(title || "");
    }, [title]);
}

export default useTitle;