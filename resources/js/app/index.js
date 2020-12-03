import React from 'react';
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { routes } from '~/routes';
import { withStore, withTheme } from '~/hocs'
import { CssBaseline, Container } from '@material-ui/core/';
import Header from '~/common/Header';
import Notices from '~/common/Notices';
import Breadcrumbs from '~/common/Breadcrumbs';
import useStyles from './styles'
import Loader from '~/common/Preloader';

const App = ({ isLoading }) => {
    const classes = useStyles();

    const routesComponents = routes.map(route => (
        <Route path={route.url}
            component={route.component}
            exact={route.exact}
            key={route.url}
        />)
    );

    return (
        <Router>
            <CssBaseline />
            <div className={classes.root}>
                <Header />
                <Notices />
                <Container className={classes.container} maxWidth={false}>
                    {isLoading && <Loader />}
                    <div className={classes.toolbar} />
                    <Breadcrumbs className={classes.breadcrumbs} />
                    <main className={classes.content}>
                        <Switch>
                            {routesComponents}
                        </Switch>
                    </main>
                </Container>
            </div>
        </Router>
    )
}



const mapStateToProps = state => {
    return {
        isLoading: state.app.isLoading,
    }
}

const ConnectedApp = connect(mapStateToProps)(App);

export default withStore(withTheme(ConnectedApp));