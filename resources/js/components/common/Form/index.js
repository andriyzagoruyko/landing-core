import React from 'react';
import { Paper } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    paper: {
        display: 'flex',
        flexWrap: 'wrap',
        alignSelf: 'stretch',
        // padding: theme.spacing(2),
    },
    title: {
        marginLeft: theme.spacing(2),
    },

    formGroup: {
        flexWrap: 'wrap',
        flex: '1 1 100%',
        margin: theme.spacing(2),

        [theme.breakpoints.down('xs')]: {
            margin: `${theme.spacing(2)}px 0`,
        },
    },
    formGroupSale: {
        alignItems: 'center'
    },

    sectionBody: {
        display: 'flex',
        flexWrap: 'wrap',
        flex: '1 1 100%'
    },

    divider: {
        width: "100%",
        margin: `${theme.spacing(2)}px 0`
    },
}));


const Form = ({ children, ...rest }) => {
    const classes = useStyles();

    return (
        <Paper component="form" className={classes.paper} {...rest}>
            {children}
        </Paper>
    )
}


export default Form;