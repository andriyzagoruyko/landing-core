import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    pagination: {
        marginTop: theme.spacing(3)
    },

    root: {
        padding: '0!important'
    },

    search: {
        display: 'flex',
        alignItems: 'center',
        width: 400,
    },
    searchInput: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    searchButton: {
        padding: 10,
    },
    container: {
        padding: theme.spacing(5),
        textAlign: 'center'
    }
}));

export default useStyles;