import React from 'react';
import Range from './Types/Range';

const filterCreator = {
    range: {
        component: (props) => <Range {...props} />,
        check: (filterVal, rowVal) => (
            (filterVal.min && rowVal < filterVal.min) ||
            (filterVal.max && rowVal > filterVal.max)
        )
    }
}

export default filterCreator;
