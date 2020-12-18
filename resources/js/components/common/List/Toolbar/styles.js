import { makeStyles, lighten } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    toolbar: {
        padding: theme.spacing(2),
        margin: `0 ${-theme.spacing(2)}px`,
        minHeight: 96,
        [theme.breakpoints.down('xs')]: {
            padding: `${theme.spacing(2)}px ${theme.spacing(1)}px`,
        },
    },

    highlight:
        theme.palette.type === 'light'
            ? {
                margin: 0,
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                margin: 0,
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    main: {
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
    },
    title: {
        flexShrink: 0,
    },
    section: {
        display: 'flex',
        alignItems: 'center',
        flex: '1 1 auto',
        margin: `${theme.spacing(1)}px ${theme.spacing(1)}px`,
        [theme.breakpoints.down('md')]: {
            justifyContent: 'center',
            flex: '1 1 100%'
        },
    },
    search: {
        margin: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
        maxWidth: `calc(100% - ${theme.spacing(4)}px)`
    },
    filter: {
        display: 'flex',
        flex: '1 1 auto',
        justifyContent: 'flex-end',
        [theme.breakpoints.down('md')]: {
            flex: '0',
        },
    },
    selectedButtons: {
        marginLeft: 'auto'
    },
}));

export default useStyles;