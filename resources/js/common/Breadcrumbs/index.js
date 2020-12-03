import React from 'react';
import { useLocation } from 'react-router-dom'
import { Typography, Breadcrumbs } from '@material-ui/core/';
import { getRouteByParth } from '~/routes'
import Link from '~c/Link';

const CustomBreadcrumbs = (props) => {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((x) => x);

    return (
        <Breadcrumbs aria-label="breadcrumb" {...props}>
            <Link color="inherit" to="/">
                Home
            </Link>

            {pathnames.map((value, index) => {
                const last = index === pathnames.length - 1;
                const to = `/${pathnames.slice(0, index + 1).join('/')}`;

                return last
                    ? (
                        <Typography color="textPrimary" key={to}>
                            {getRouteByParth(to).title}
                        </Typography>
                    )
                    : (
                        <Link color="inherit" to={to} key={to}>
                            {getRouteByParth(to).title}
                        </Link>
                    );
            })}
        </Breadcrumbs>
    );
}

export default CustomBreadcrumbs;