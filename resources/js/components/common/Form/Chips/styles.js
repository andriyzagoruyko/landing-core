import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        listStyle: 'none',
        padding: theme.spacing(0.5),
        marginTop: theme.spacing(2),
        marginBottom: 0,
        maxWidth: '100%',
        flexWrap: 'wrap',
        borderColor: 'rgba(0, 0, 0, 0.23)'
    },
    chip: {
        margin: theme.spacing(1),
    },
    formControl: {
        margin: theme.spacing(2),
    },
}));

export default useStyles;