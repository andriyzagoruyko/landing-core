import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap-reverse',
        alignItems: 'center',
        marginTop: theme.spacing(2),
        padding: theme.spacing(1)
    },
    formControl: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: theme.spacing(2)
    },
    label: {
        position: 'static'
    },
    select: {
        margin: '0!important'
    }
}));

export default useStyles;