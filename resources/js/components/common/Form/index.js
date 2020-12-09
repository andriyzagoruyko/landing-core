import React from 'react';
import PropTypes from 'prop-types';
import { Paper, FormGroup, Typography } from '@material-ui/core/';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import { makeFields } from './fieldCreator';

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


const Form = ({ formStructure, ...rest }) => {
    const classes = useStyles();

    const sections = formStructure.map(({ title = '', divider = true, fields }, index) => {
        return (
            <React.Fragment key={index}>
                <FormGroup row className={classes.formGroup}>
                    {title && (
                        <Typography variant="h6" className={classes.title}>{title}</Typography>
                    )}
                    <div className={classes.sectionBody}>
                        {makeFields(fields)}
                    </div>
                </FormGroup>

                {divider && (
                    <Divider className={classes.divider} />
                )}
            </React.Fragment>
        )
    })

    return (
        <Paper component="form" className={classes.paper} {...rest}>
            {sections}
        </Paper>
    )
}

Form.propTypes = {
    formStructure: PropTypes.array.isRequired,
};

export default Form;