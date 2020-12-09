import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link as RouterLink } from 'react-router-dom';
import { urlBuilder } from '~/routes';
import { makeStyles } from '@material-ui/core/styles';
import { ListItemIcon, ListItem, ListItemText } from '@material-ui/core/';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles(theme => ({
    activeItem: {
        backgroundColor: 'rgba(0, 0, 0, 0.07)'
    },
    icon: {
        minWidth: theme.spacing(4)
    }
}));

const NavItem = ({ to, primary, icon, active, hasSubmenu, onClick, className }) => {
    const classes = useStyles();

    const renderLink = url => {
        return React.useMemo(
            () => React.forwardRef((itemProps, ref) => <RouterLink to={url} ref={ref} {...itemProps} />),
            [url],
        );
    }

    return (
        <ListItem
            button
            component={to ? renderLink(to) : null}
            className={classNames((active ? classes.activeItem : null), className)}
            onClick={onClick}
        >
            {icon ? <ListItemIcon className={classes.icon}>{icon}</ListItemIcon> : null}
            <ListItemText primary={primary} />
            {hasSubmenu && (active ? <ExpandLess /> : <ExpandMore />)}
        </ListItem>
    );
}

NavItem.propTypes = {
    to: PropTypes.string,
    primary: PropTypes.string,
    icon: PropTypes.element,
    active: PropTypes.bool,
    hasSubmenu: PropTypes.bool,
    onClick: PropTypes.func,
};

NavItem.defaultProps = {
    onClick: () => { },
}

export default NavItem;
