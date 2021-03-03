import React from 'react';
import { useLocation } from 'react-router-dom';
import { Typography, Breadcrumbs } from '@material-ui/core/';
import { getRouteByUrl } from '~/routes';
import Link from '~c/common/Link';

const Crumb = ({ isActive, title, to }) =>
    isActive ? (
        <Link color="inherit" to={to}>
            {title}
        </Link>
    ) : (
        <Typography color="textPrimary">{title}</Typography>
    );

const CustomBreadcrumbs = (props) => {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter(Boolean);
    const currentRoute = getRouteByUrl(location.pathname);

    const crumbs = pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;
        const route = getRouteByUrl(to);
        const isActive = route.path !== currentRoute.path;

        return (
            <Crumb
                title={route.title}
                isActive={isActive}
                to={to}
                key={to}
            />
        );
    });

    return (
        <Breadcrumbs aria-label="breadcrumb" {...props}>
            <Crumb isActive={crumbs.length > 0} title="Home" to="/" />
            {crumbs}
        </Breadcrumbs>
    );
};

export default CustomBreadcrumbs;
