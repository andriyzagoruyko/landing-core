
import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    title: {
        marginLeft: theme.spacing(2),
    },

    formGroup: {
        flexWrap: 'wrap',
        flex: '1 1 100%',
        width: '100%',
    },

    formGroupMargin: {
        margin: theme.spacing(2),
        [theme.breakpoints.down('xs')]: {
            margin: `${theme.spacing(2)}px 0`,
        },
    },

    sectionBody: {
        display: 'flex',
        flexWrap: 'wrap',
        flex: '1 1 100%',
        width: '100%'
    },

    divider: {
        width: "100%",
        margin: `${theme.spacing(2)}px 0`
    },
}));