
import { makeStyles } from '@material-ui/core/';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex'
    },
    toolbar: theme.mixins.toolbar,
    container: {
        padding: theme.spacing(4),
        paddingTop: 0,
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        overflow: 'hidden',

        [theme.breakpoints.down('sm')]: {
            padding: theme.spacing(2),
        },

        [theme.breakpoints.down('xs')]: {
            padding: theme.spacing(1),
        },
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        flexGrow: 1,
        marginTop: theme.spacing(4),

        [theme.breakpoints.down('xs')]: {
            marginTop: theme.spacing(2),
        },
    },
    breadcrumbs: {
        marginTop: theme.spacing(4),

        [theme.breakpoints.down('lg')]: {
            marginTop: theme.spacing(1),
        },
    },
}));

export default useStyles;