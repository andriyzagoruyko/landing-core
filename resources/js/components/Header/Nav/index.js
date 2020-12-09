import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import { getRouteByUrl, routesMatch } from '~/routes';
import { Divider, Drawer, Hidden, List } from '@material-ui/core/';
import Logo from './Logo';
import Item from './Item';
import Submenu from './Submenu';
import { navStyles } from '../styles';

const Nav = ({ isOpened, onClose, navList }) => {
    const [openedItems, setOpenedItems] = useState([]);
    const classes = navStyles();
    const location = useLocation();
    const currentRoutePath = getRouteByUrl(location.pathname).path;

    const handleClick = (index, isSubmenu = false, hasSubmenu = false) => {
        if (!isSubmenu) {
            let newOpenedItems = [];
            newOpenedItems[index] = !openedItems[index];
            setOpenedItems(newOpenedItems);
        }

        if (!hasSubmenu) {
            onClose();
        }
    }

    const Items = (
        <div className={classes.drawerPaper}>
            <Logo />
            <Divider />
            <List>
                {navList.map(({ icon, label, to, submenu }, index) => (
                    <li key={index}>
                        <Item
                            to={to}
                            primary={label}
                            icon={icon}
                            hasSubmenu={submenu != undefined}
                            active={routesMatch(currentRoutePath, to)}
                            onClick={() => handleClick(index, false, Boolean(submenu))}
                        />
                        {submenu && (
                            <Submenu
                                isOpened={openedItems[index] || false}
                                list={submenu}
                                onItemClick={() => { handleClick(index, true) }}
                                currentRoute={currentRoutePath} />
                        )}
                    </li>
                ))}
            </List>
        </div>
    );

    return (
        <nav className={classes.drawer} aria-label="menu">
            <Hidden lgUp >
                <Drawer
                    variant="temporary"
                    ModalProps={{ keepMounted: true }}
                    open={isOpened}
                    onClose={onClose}
                >
                    {Items}
                </Drawer>
            </Hidden>
            <Hidden mdDown>
                <Drawer
                    variant="permanent"
                    open
                >
                    {Items}
                </Drawer>
            </Hidden>
        </nav>
    )
}

Nav.propTypes = {
    navList: PropTypes.array.isRequired,
    isOpened: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default Nav;