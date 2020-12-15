import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = (aspectRatio) => makeStyles(theme => ({
    container: {
        position: 'relative',
        overflow: 'hidden',
        background: 'rgba(0, 0, 0, 0.05)',
        paddingBottom: `${aspectRatio}%`
    },
    image: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
    },
    placeholder: {
        transition: 'visibility 0ms ease 400ms'
    },
    full: {
        transition: 'opacity 400ms ease 0ms'
    }
}));

/*
          <img
                {...props}
                src={placeholder}
                className={clsx(classes.image, classes.placeholder)}
                style={{ visibility: isLoaded ? "hidden" : "visible" }}
            />
            */

const ResponsiveImage = ({ width, height, src, srcSet, placeholder, ...props }) => {
    const ref = React.useRef();
    const [sizes, setSizes] = React.useState('1px');
    const [isLoaded, setIsLoaded] = React.useState(false);
    const aspectRatio = (height / width) * 100;
    const classes = useStyles(aspectRatio)();

    const handleLoad = () => {
        if (!isLoaded) {
            setSizes(Math.ceil(ref.current.getBoundingClientRect().width / window.innerWidth * 100) + 'vw');
            setIsLoaded(true);
        }
    }

    return (
        <div
            ref={ref}
            className={classes.container}
            style={{ paddingBottom: `${aspectRatio}%` }}
        >
            <img
                {...props}
                sizes={sizes}
                src={src}
                srcSet={srcSet}
                className={clsx(classes.image, classes.full)}
                style={{ opacity: isLoaded ? 1 : 0 }}
                onLoad={handleLoad}
            />
        </div>
    );
}

export default ResponsiveImage;

