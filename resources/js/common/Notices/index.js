import React from 'react';
import { connect } from 'react-redux'
import { makeStyles, Grow } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { removeNotice, fadeOutNotice } from '~s/actionCreators/notices'

const useStyles = makeStyles(theme => ({
    root: {
        position: 'fixed',
        right: 0,
        top: theme.mixins.toolbar.minHeight,
        display: 'flex',
        flexDirection: 'column',
        zIndex: 100,
        margin: theme.spacing(2),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: 300
        },
        [theme.breakpoints.down('xs')]: {
            margin: 0
        },
    },
    notice: {
        margin: theme.spacing(1),
    }
}))

const Notices = ({ notices, removeNotice, fadeOutNotice }) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            {
                notices.map(({ type, text, id, show }, index) => (
                    <Grow
                        in={show}
                        className={classes.notice}
                        component="div"
                        key={index}
                        unmountOnExit
                        onExited={() => removeNotice(id)}
                    >
                        <Alert
                            severity={type}
                            onClose={() => { fadeOutNotice(id) }}
                        >
                            {text}
                        </Alert>
                    </Grow>
                ))
            }
        </div>
    );
};

const mapStateToProps = state => {
    return {
        notices: state.notices.messages,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        fadeOutNotice: (id) => dispatch(fadeOutNotice(id)),
        removeNotice: (id) => dispatch(removeNotice(id)),
    }
}

export default React.memo(
    connect(
        mapStateToProps,
        mapDispatchToProps)(Notices)
)

