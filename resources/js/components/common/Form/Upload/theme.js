
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
                overflow: "auto"
            },
            imageContainer: {
                flex: '0 0 33.333333%',
                maxWidth: 250
            },
            image: {
                objectFit: 'contain'
            }
        }
    }
});

export default theme;