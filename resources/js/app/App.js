import React from 'react';
import { connect } from 'react-redux';
import { Router } from '~/routes';
import { CssBaseline, Container } from '@material-ui/core/';
import useStyles from './styles';
import Header from '~c/app/Header';
import Notifier from '~c/app/Notifier';
import Breadcrumbs from '~c/app/Breadcrumbs';
import Loader from '~c/common/Preloader';

const App = (props) => {
    const classes = useStyles();

    return (
        <>
            <CssBaseline />
            <div className={classes.root}>
                <Header />
                <Notifier />
                <Container
                    className={classes.container}
                    maxWidth={false}
                >
                    {props.isLoading && <Loader />}
                    <div className={classes.toolbar} />
                    <Breadcrumbs className={classes.breadcrumbs} />
                    <main className={classes.content}>
                        <Router />
                    </main>
                </Container>
            </div>
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        isLoading: state.app.isLoading,
    };
};

export default connect(mapStateToProps)(App);
