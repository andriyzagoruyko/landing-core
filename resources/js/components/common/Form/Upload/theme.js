
import { createMuiTheme } from "@material-ui/core/styles";

const defaultTheme = createMuiTheme();
const theme = createMuiTheme({
    overrides: {
        MuiDropzoneArea: {
            root: {
                order: 1,
                minHeight: 0
            },
            icon: {
                marginBottom: defaultTheme.spacing(2)
            }
        },
        MuiDropzonePreviewList: {
            root: {
                margin: `0 -${defaultTheme.spacing(2)}px `,
                padding: `${defaultTheme.spacing(2)}px 0`,
                width: '100%',
                display: 'flex',
                flexWrap: 'nowrap',
                overflow: "auto",
            },
            imageContainer: {
                maxWidth: 250,
                flex: '0 0 auto',
                padding: `${defaultTheme.spacing(2)}px !important`,
                [defaultTheme.breakpoints.down('md')]: {
                    padding: `${defaultTheme.spacing(1)}px !important`,
                    marginLeft: defaultTheme.spacing(1)
                },
            },
            image: {
                objectFit: 'contain',
                maxHeight: '100%',
            }
        }
    }
});

export default theme;