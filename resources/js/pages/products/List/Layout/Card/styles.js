
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
    },

    cardContent: {
        flexGrow: 1,
        textAlign: 'center'
    },
    cardTitle: {
        marginBottom: theme.spacing(1)
    },
    cardDescription: {
        marginTop: theme.spacing(1),
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
    },
    cardActions: {
        backgroundColor: 'rgba(0, 0, 0, 0.04)',
        justifyContent: 'space-around'
    },
}));

export default useStyles;