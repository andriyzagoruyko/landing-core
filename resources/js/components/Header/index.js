import React from 'react';
import { useLocation } from 'react-router-dom'
import { getRouteByUrl } from '~/routes'
import { AppBar, Toolbar, Typography, Button, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import Nav from './Nav';
import { headerStyles } from './styles';
import { navList } from '~/routes';

const Header = () => {
    const [navOpen, setNavOpen] = React.useState(false);
    const classes = headerStyles();
    const location = useLocation();
    const currentRoute = getRouteByUrl(location.pathname);
    const handleNavOpen = () => setNavOpen(true);
    const handleNavClose = () => setNavOpen(false);

    return (
        <>
            <AppBar
                position="fixed"
                className={classes.appBar}
            >
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="open menu"
                        onClick={handleNavOpen}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        {currentRoute.title}
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Nav
                navList={navList}
                isOpened={navOpen}
                onClose={handleNavClose} />
        </>
    );
}

export default Header;