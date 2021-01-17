import React from 'react';
import { Tooltip, IconButton } from '@material-ui/core';

const ViewTypes = ({ viewTypeItems, viewType = null, onChangeView }) => {
    if (!viewType) {
        return null;
    }

    const isActive = (viewTypeName) => viewType === viewTypeName;

    return viewTypeItems.map(({ title, name, icon: Icon }) => (
        <Tooltip title={title} key={name}>
            <IconButton
                aria-label={name}
                onClick={() => onChangeView(name)}
                color={isActive(name) ? 'primary' : 'default'}
            >
                <Icon />
            </IconButton>
        </Tooltip>
    ));
}

export default ViewTypes;