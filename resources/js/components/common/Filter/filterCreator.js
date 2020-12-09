import React from 'react';
import Range from './Types/Range';

const filterCreator = {
    range: {
        component: (props) => <Range {...props} />,
    }
}

export default filterCreator;
