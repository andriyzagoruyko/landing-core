import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { FormGroup, Typography, Divider } from '@material-ui/core/';
import useStyles from './styles';

const FormSection = ({ children, title, divider, dense = false, ...rest }) => {
    const classes = useStyles();

    return (
        <>
            <FormGroup row className={clsx(classes.formGroup, {
                [classes.formGroupMargin]: !dense,
            })}
                {...rest}
            >
                {title && (
                    <Typography variant="button" className={classes.title}>
                        {title}
                    </Typography>
                )}

                <div className={classes.sectionBody}>
                    {children}
                </div>
            </FormGroup>

            {divider && <Divider className={classes.divider} />}
        </>
    )
}

FormSection.propTypes = {
    title: PropTypes.string,
    divider: PropTypes.bool,
    dense: PropTypes.bool,
    onDelete: PropTypes.func
};

export default FormSection;