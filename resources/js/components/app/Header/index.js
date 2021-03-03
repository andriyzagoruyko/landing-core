import React from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    IconButton,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import Nav from './Nav';
import { headerStyles } from './styles';
import { navList } from '~/routes';
import { useSelector } from 'react-redux';

const Header = () => {
    const classes = headerStyles();
    const [navOpen, setNavOpen] = React.useState(false);
    const title = useSelector((store) => store.app.title);

    return (
        <>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open menu"
                        className={classes.menuButton}
                        onClick={() => setNavOpen(true)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        className={classes.title}
                    >
                        {title}
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Nav
                navList={navList}
                isOpened={navOpen}
                onClose={() => setNavOpen(false)}
            />
        </>
    );
};

export default Header;
