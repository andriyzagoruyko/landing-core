import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
    /*palette: {
        primary: {
            main: purple[500],
        },
        secondary: {
            main: green[500],
        },
    },*/
    mixins: {
        navWidth: 260
    }
});

