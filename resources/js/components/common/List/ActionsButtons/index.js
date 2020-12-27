import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const ActionsButtons = ({ onRemove, onEdit }) => {
    return (
        <>
            <IconButton size="small" aria-label="edit" onClick={onEdit}>
                <EditIcon color="primary" />
            </IconButton>

            <IconButton size="small" aria-label="edit" onClick={onRemove} >
                <DeleteIcon color="secondary" />
            </IconButton>
        </>
    );
};

export default ActionsButtons;


