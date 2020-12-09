import React from 'react';
import { Link } from 'react-router-dom';
import { Pagination, PaginationItem } from '@material-ui/lab/';
import { makeStyles, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap-reverse',
        alignItems: 'center',
        marginTop: theme.spacing(2),
        padding: theme.spacing(1)
    },
    formControl: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: theme.spacing(2)
    },
    label: {
        position: 'static'
    },
    select: {
        margin: '0!important'
    }
}))

const CustomPagination = ({ maxPages, page, perPage, routeName, perPageOptions, onChangePage, onChangePerPage, ...props }) => {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <FormControl className={classes.formControl}>
                <InputLabel id="per-page" className={classes.label}>Per page</InputLabel>
                <Select
                    labelId="per-page"
                    value={perPage}
                    onChange={onChangePerPage}
                    className={classes.select}

                >
                    {perPageOptions.map(opt => <MenuItem key={opt} value={opt}>{opt}</MenuItem>)}
                </Select>
            </FormControl>

            <Pagination
                count={maxPages}
                page={page}
                onChange={onChangePage}
                {...props}
            />
        </div>

    )
}

/*
          renderItem={(item) => (
                    <PaginationItem
                        component={Link}
                        to={`/products${item.page === 1 ? '' : `?page=${item.page}`}`}
                        {...item}
                    />
                )}
                */

export default CustomPagination;