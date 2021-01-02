import React from 'react';
import clsx from 'clsx';
import { FormGroup, Typography, Divider } from '@material-ui/core/';
import useStyles from './styles';

const FormSection = ({ children, title, divider, dense = false, ...rest }) => {
    const classes = useStyles();

    return (
        <React.Fragment>
            <FormGroup row className={clsx(classes.formGroup, {
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