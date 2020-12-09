import { makeStyles } from '@material-ui/core';

export const headerStyles = makeStyles((theme) => ({
    title: {
        flexGrow: 1,
    },
    appBar: {
        [theme.breakpoints.up('lg')]: {
            width: `calc(100% - ${theme.mixins.navWidth}px)`,
            marginLeft: theme.mixins.navWidth,
        }
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('lg')]: {
            display: 'none',
        },
    },
    appBarShift: {
        width: `calc(100% - ${theme.mixins.navWidth}px)`,
        marginLeft: theme.mixins.navWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
}));

export const navStyles = makeStyles(theme => ({
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

