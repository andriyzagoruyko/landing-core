import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    textField: {
        margin: theme.spacing(2),
        [theme.breakpoints.down('xs')]: {
            flexGrow: 1,
        },
    },
    textFieldGrow: {
        flexGrow: 1,
    },
    helperText: {
        position: 'absolute',
        bottom: -5,
        transform: 'translateY(100%)'
    },
}));
