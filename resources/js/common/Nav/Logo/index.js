import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core/';
import logo from './logo.svg'

const useStyles = makeStyles(theme => ({
    logo: {
        ...theme.mixins.toolbar,
        display: 'flex',
        alignItems: 'center',
        boxSizing: 'border-box',
        paddingLeft: theme.spacing(2)
    },
    img: {
        width: 36,
        marginRight: theme.spacing(1)
    },
    landing: {
        color: theme.palette.primary.dark
    },
}));

const Logo = () => {
    const classes = useStyles();
    return (
        <div className={classes.logo} >
            <img className={classes.img} src={logo} alt="" />
            <Typography variant="h5" component="span">
                <strong className={classes.landing}>Landing</strong> core
            </Typography>
        </div>
    );
}

export default Logo;