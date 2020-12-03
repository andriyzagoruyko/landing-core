import React from 'react';
import { useLocation } from 'react-router-dom'
import { getRouteByParth } from '~/routes'
import { AppBar, Toolbar, Typography, Button, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import Nav from '~/common/Nav';
import useStyles from './styles';

const Header = () => {
    const [navOpen, setNavOpen] = React.useState(false);
    const classes = useStyles();
    const location = useLocation();
    const currentRoute = getRouteByParth(location.pathname);
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
                isOpened={navOpen}
                onClose={handleNavClose} />
        </>
    );
}

export default Header;