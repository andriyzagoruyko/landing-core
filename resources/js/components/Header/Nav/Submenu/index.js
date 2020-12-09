

import React from 'react';
import PropTypes from 'prop-types';
import { List, Collapse } from '@material-ui/core/';
import NavItem from '../Item';
import { makeStyles } from '@material-ui/core/styles';
import { routesMatch } from '~/routes';

const useStyles = makeStyles(theme => ({
    submenuItem: {
        paddingLeft: theme.spacing(6)
    },
}));

const NavSubmenu = ({ list, isOpened, currentRoute, onItemClick }) => {
    const classes = useStyles();
    return (
        <Collapse in={isOpened} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
                {list.map(({ icon, label, to }) => (
                    <NavItem
                        to={to}
                        primary={label}
                        icon={icon}
                        active={routesMatch(currentRoute, to)}
                        onClick={onItemClick}
                        key={to}
                        className={classes.submenuItem}
                    />
                ))}
            </List>
        </Collapse>
    )
}

NavSubmenu.propTypes = {
    list: PropTypes.array.isRequired,
    isOpened: PropTypes.bool,
    currentRoute: PropTypes.string,
    onItemClick: PropTypes.func,
};

NavSubmenu.defaultProps = {
    onItemClick: () => { },
}

export default NavSubmenu;
