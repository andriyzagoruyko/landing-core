import React from 'react';
import clsx from 'clsx';
import { FormGroup, Typography, Divider } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    title: {
        marginLeft: theme.spacing(2),
    },

    formGroup: {
        flexWrap: 'wrap',
        flex: '1 1 100%',
        width: '100%',
    },

    formGroupMargin: {
        margin: theme.spacing(2),
        [theme.breakpoints.down('xs')]: {
            margin: `${theme.spacing(2)}px 0`,
        },
    },

    sectionBody: {
        display: 'flex',
        flexWrap: 'wrap',
        flex: '1 1 100%',
        width: '100%'
    },

    divider: {
        width: "100%",
        margin: `${theme.spacing(2)}px 0`
    },
}));

const FormSection = ({ children, title, divider, dense = false, ...rest }) => {
    const classes = useStyles();

    return (
        <React.Fragment>
            <FormGroup row className={clsx(classes.formGroup,{
                    [classes.formGroupMargin]: !dense,
                })}
                {...rest}
            >
                {title && (
                    <Typography variant="h6" className={classes.title}>{title}</Typography>
                )}
                <div className={classes.sectionBody}>
                    {children}
                </div>
            </FormGroup>

            {divider && (
                <Divider className={classes.divider} />
            )}
        </React.Fragment>
    )
}

export default FormSection;