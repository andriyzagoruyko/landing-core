import React from 'react';
import { Box } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    image: {
        margin: `${theme.spacing(1)}px auto`,
        width: '150px'
    },
}));

const Thumbnails = ({ images, ...rest }) => {
    const classes = useStyles();
    return (
        <Box display="flex" alignItems="center" m={2} overflow="auto">
            {images && images.map(image => (
                <img src={image.src} className={classes.image} alt=""/>
            ))}
        </Box>
    );
}

export default Thumbnails;