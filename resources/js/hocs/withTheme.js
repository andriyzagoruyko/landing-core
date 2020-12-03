import React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
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

const withTheme = (Component) => () => {
    return (
        <ThemeProvider theme={theme}>
            <Component />
        </ThemeProvider>
    );
}

export default withTheme; 
