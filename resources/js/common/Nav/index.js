import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import { getRouteByParth } from '~/routes';
import { makeStyles } from '@material-ui/core/styles';
import { Divider, Drawer, Hidden, List } from '@material-ui/core/';
import navList from './navList';
import Logo from './Logo/';
import Item from './Item/';
import Submenu from './Submenu/';

const useStyles = makeStyles(theme => ({
    drawer: {
        [theme.breakpoints.up('lg')]: {
            width: theme.mixins.navWidth,
            flexShrink: 0,
        },
    },
    drawerPaper: {
        width: theme.mixins.navWidth
    },
}));

const Nav = ({ isOpened, onClose }) => {
    const [openedItems, setOpenedItems] = useState([]);
    const classes = useStyles();
    const location = useLocation();
    const currentRoute = getRouteByParth(location.pathname).name;

    const handleClick = (index, isSubmenu = false) => {
        if (!isSubmenu) {
            let newOpenedItems = [];
            newOpenedItems[index] = !openedItems[index];
            setOpenedItems(newOpenedItems);
        }
    }

    const Items = (
        <div className={classes.drawerPaper}>
            <Logo />
            <Divider />
            <List>
                {navList.map(({ icon, name, to, submenu }, index) => (
                    <li key={index}>
                        <Item
                            to={to}
                            primary={name}
                            icon={icon}
                            hasSubmenu={submenu != undefined}
                            active={to === currentRoute}
                            onClick={() => handleClick(index)}
                        />
                        {submenu && (
                            <Submenu
                                isOpened={openedItems[index] || false}
                                list={submenu}
                                onItemClick={() => handleClick(index, true)}
                                currentRoute={currentRoute} />
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
    isOpened: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default Nav;