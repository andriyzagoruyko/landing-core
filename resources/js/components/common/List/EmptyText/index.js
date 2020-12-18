import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    empty: {
        padding: theme.spacing(5),
        textAlign: 'center'
    }
}));

const EmptyText = ({ children }) => {
    const classes = useStyles();
    
    return (
        <Container className={classes.empty}>
            <Typography variant="subtitle1" component="span">
                {children}
            </Typography>
        </Container>
    )
};

export default EmptyText;

