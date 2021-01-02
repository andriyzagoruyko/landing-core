import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    paper: {
        display: 'flex',
        flexWrap: 'wrap',
        alignSelf: 'stretch',
    },
    title: {
        marginLeft: theme.spacing(2),
    },

    formGroup: {
        flexWrap: 'wrap',
        flex: '1 1 100%',
        margin: theme.spacing(2),

        [theme.breakpoints.down('xs')]: {
            margin: `${theme.spacing(2)}px 0`,
        },
    },
    formGroupSale: {
        alignItems: 'center'
    },

    sectionBody: {
        display: 'flex',
        flexWrap: 'wrap',
        flex: '1 1 100%'
    },

    divider: {
        width: "100%",
        margin: `${theme.spacing(2)}px 0`
    },
}));

