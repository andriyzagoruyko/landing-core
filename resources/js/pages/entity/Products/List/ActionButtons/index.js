import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const ActionButtons = ({ id, callbacks }) => {
    return (
        <>
            <IconButton size="small" aria-label="edit" onClick={() => callbacks.push(urlBuilder('productsEdit', { id }))}>
                <EditIcon color="primary" />
            </IconButton>

            <IconButton size="small" aria-label="edit" onClick={() => callbacks.remove([id])} >
                <DeleteIcon color="secondary" />
            </IconButton>
        </>
    );
}
export default ActionButtons;