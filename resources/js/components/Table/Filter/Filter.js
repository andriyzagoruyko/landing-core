import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton, Tooltip, Menu, MenuItem, Checkbox, Badge } from '@material-ui/core/';
import FilterListIcon from '@material-ui/icons/FilterList';
import filterCreator from './filterCreator';

const useStyles = makeStyles(() => ({
    root: {
        flex: '1 1 auto',
        display: 'flex',
        justifyContent: 'flex-end'
    },
    filter: {
        display: 'flex',
        alignItems: 'center',
        marginLeft: 'auto'
    },
}));

const Filter = ({ show = true, filterItems, filterBadge, onFilterChange }) => {
    if (!show) {
        return null;
    }

    let FilterComponent;
    const classes = useStyles();
    const [menuEl, setMenuEl] = useState(false);
    const [currentFilter, setCurrentFilter] = useState('');

    const handleMenuClick = (e, filterName) => {
        if (filterName != "backdropClick") {
            if (e.target.getAttribute('type') != 'checkbox') {
                if (!filterItems[filterName].active) {
                    filterItems[filterName].active = true;
                    onFilterChange(filterItems);
                }
                setCurrentFilter(filterName);
            }
        } else {
            setMenuEl(null);
        }
    }

    const handleChangeCheckbox = (filterName) => {
        const filter = { ...filterItems[filterName] };

        if (!filter.active) {
            setCurrentFilter(filterName);
        } else {
            filter.value = {};
            setCurrentFilter('');
        }

        filter.active = !filter.active;
        onFilterChange({ ...filterItems, [filterName]: filter });
    }

    const onSubmit = (value) => {
        const filter = { ...filterItems[currentFilter] };
        filter.value = { ...value };
        onFilterChange({ ...filterItems, [currentFilter]: filter });
        setCurrentFilter('');
    }

    if (currentFilter) {
        const { type, label, value } = filterItems[currentFilter];
        FilterComponent = filterCreator[type].component({
            label,
            value,
            onSubmit,
            key: currentFilter,
        });
    }

    return (
        <div className={classes.root}>
            {FilterComponent && (
                <div className={classes.filter}>
                    {FilterComponent}
                </div>
            )}
            <Menu
                anchorEl={menuEl}
                keepMounted
                open={Boolean(menuEl)}
                getContentAnchorEl={null}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                onClose={handleMenuClick}
            >
                {Object.values(filterItems).map(({ name, active, label }) => (
                    <MenuItem onClick={(e) => handleMenuClick(e, name)} key={name}>
                        <Checkbox
                            color="primary"
                            checked={active || false}
                            onChange={() => handleChangeCheckbox(name)}
                            inputProps={{ 'aria-label': 'select filter' }}
                        />
                        {label}
                    </MenuItem>
                ))}
            </Menu>
            <Badge badgeContent={filterBadge} color="secondary">
                <Tooltip
                    color={Boolean(menuEl) ? "primary" : "default"}
                    title="Filter list"
                    className={classes.tooltip}
                    onClick={e => setMenuEl(e.currentTarget)}
                >
                    <IconButton aria-label="filter list">
                        <FilterListIcon />
                    </IconButton>
                </Tooltip>
            </Badge>
        </div>
    );
}

export default Filter;