import React from 'react';
import { useLocation } from 'react-router-dom'
import { Typography, Breadcrumbs } from '@material-ui/core/';
import { getRouteByUrl } from '~/routes'
import Link from '~c/common/Link';

const CustomBreadcrumbs = (props) => {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((x) => x);
    const currentRoute = getRouteByUrl(location.pathname);

    return (
        <Breadcrumbs aria-label="breadcrumb" {...props}>
            <Link color="inherit" to="/">
                Home
            </Link>

            {pathnames.map((value, index) => {
                const to = `/${pathnames.slice(0, index + 1).join('/')}`,
                    route = getRouteByUrl(to);

                return route.name !== currentRoute.name
                    ? (
                        <Link color="inherit" to={to} key={to}>
                            {route.title}
                        </Link>
                    )
                    : (
                        <Typography color="textPrimary" key={to}>
                            {route.title}
                        </Typography>
                    )
            })}
        </Breadcrumbs>
    );
}

export default CustomBreadcrumbs;