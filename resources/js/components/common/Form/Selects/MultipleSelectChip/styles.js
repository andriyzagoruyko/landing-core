
import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(2),
        fisplay: 'inline-flex',
        minWidth: 400,
        maxWidth: '100%',
        [theme.breakpoints.down('xs')]: {
            width: '100%'
        },
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: theme.spacing(1),
    },
}));
