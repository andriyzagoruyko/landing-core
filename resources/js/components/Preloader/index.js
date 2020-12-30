import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    backdrop: {
        position: 'absolute',
        zIndex: 100,
        color: '#fff',
    },
    loader: {
        position: 'fixed',
        top: '50%',
        left: '50%',
        marginLeft: '-20px',
        marginTop: '-20px',
        [theme.breakpoints.up('sm')]: {
            left: `calc(50% + ${theme.mixins.navWidth / 2}px)`
        },
    },
}));

function LoadingBackdrop({ open = true, ...restProps }) {
    const classes = useStyles();
    return (
        <Backdrop open={open} className={classes.backdrop} {...restProps}>
            <CircularProgress className={classes.loader} color="inherit" />
        </Backdrop>
    );
}

export default React.memo(LoadingBackdrop);