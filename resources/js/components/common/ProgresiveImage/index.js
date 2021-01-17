import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = (aspectRatio) => makeStyles({
    container: {
        position: 'relative',
        overflow: 'hidden',
        //background: 'rgba(0, 0, 0, 0.05)',
        paddingBottom: `${aspectRatio}%`
    },
    image: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        transition: 'opacity 400ms ease 0ms'
    },
});

const ResponsiveImage = ({ width, height, src, srcSet, ...props }) => {
    const [sizes, setSizes] = useState(null);
    const classes = useStyles(height / width * 100)();

    const handleLoad = ({ target }) => !sizes && setSizes(
        Math.ceil(target.getBoundingClientRect().width / window.innerWidth * 100) + 'vw'
    );

    return (
        <div className={classes.container}>
            <img
                sizes={sizes ? sizes : '1px'}
                src={src}
                srcSet={srcSet}
                className={clsx(classes.image, classes.full)}
                style={{ opacity: sizes ? 1 : 0 }}
                onLoad={handleLoad}
                {...props}
            />
        </div>
    );
}

ResponsiveImage.propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    src: PropTypes.string,
    srcSet: PropTypes.string,
    progressProps: PropTypes.object
};

export default ResponsiveImage;

