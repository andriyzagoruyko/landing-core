import React from 'react';
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom';
import { routes } from '~/routes';
import { CssBaseline, Container } from '@material-ui/core/';
import useStyles from './styles'
import Header from '~c/Header';
import Notices from '~c/Notices';
import Breadcrumbs from '~c/Breadcrumbs';
import Loader from '~c/Preloader';

const App = (props) => {
    const classes = useStyles();

    const routesComponents = Object.values(routes).map(route => (
        <Route
            path={route.path}
            component={route.component}
            exact={route.exact}
            key={route.path}
        />
    ));

    return (
        <>
            <CssBaseline />
            <div className={classes.root}>
                <Header />
                <Notices />
                <Container className={classes.container} maxWidth={false}>
                    {props.isLoading && <Loader />}
                    <div className={classes.toolbar} />
                    <Breadcrumbs className={classes.breadcrumbs} />
                    <main className={classes.content}>
                        <Switch>
                            {routesComponents}
                        </Switch>
                    </main>
                </Container>
            </div>
        </>
    )
}

const mapStateToProps = state => {
    return {
        isLoading: state.app.isLoading,
    }
}

export default connect(mapStateToProps)(App);