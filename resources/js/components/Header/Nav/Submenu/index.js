

import React from 'react';
import PropTypes from 'prop-types';
import { List, Collapse } from '@material-ui/core/';
import NavItem from '../Item';

const NavSubmenu = ({ list, isOpened, onItemClick }) => {
    return (
        <Collapse in={isOpened} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
                {list.map(({ icon, label, to, exact }) => (
                    <NavItem
                        to={to}
                        primary={label}
                        icon={icon}
                        exact={exact}
                        onClick={onItemClick}
                        key={to}
                        sumbenuChild
                    />
                ))}
            </List>
        </Collapse>
    )
}

NavSubmenu.propTypes = {
    list: PropTypes.array.isRequired,
    isOpened: PropTypes.bool,
    onItemClick: PropTypes.func,
};

NavSubmenu.defaultProps = {
    onItemClick: () => { },
}

export default NavSubmenu;
