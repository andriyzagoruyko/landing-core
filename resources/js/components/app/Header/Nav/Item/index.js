import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { ListItemIcon, ListItem, ListItemText } from '@material-ui/core/';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles(theme => ({
    icon: {
        minWidth: theme.spacing(4)
    },
    submenuItem: {
        paddingLeft: theme.spacing(6)
    },
}));

const NavItem = ({ to, primary, icon, exact, active, hasSubmenu, onClick, sumbenuChild }) => {
    const classes = useStyles();

    const renderLink = url => {
        return React.useMemo(
            () => React.forwardRef((itemProps, ref) => <NavLink
                activeStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.07)' }}
                to={url}
                ref={ref}
                exact={exact}
                aria-current='page'
                {...itemProps}
            />),
            [url],
        );
    }

    return (
        <ListItem
            button
            component={to ? renderLink(to) : null}
            onClick={onClick}
            className={sumbenuChild ? classes.submenuItem : null}
        >
            {icon
                ? <ListItemIcon className={classes.icon}>{icon}</ListItemIcon>
                : null}
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
    sumbenuChild: PropTypes.bool,
    hasSubmenu: PropTypes.bool,
    onClick: PropTypes.func,
};

NavItem.defaultProps = {
    onClick: () => { },
}

export default NavItem;
