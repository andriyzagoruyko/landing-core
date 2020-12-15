import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton, Tooltip, Menu, MenuItem, Checkbox, Badge } from '@material-ui/core/';
import FilterListIcon from '@material-ui/icons/FilterList';
import filterCreator from './filterCreator';

const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
    },
    filter: {
        display: 'flex',
        alignItems: 'center',
        marginLeft: 'auto'
    },
}));

const Filter = ({ show = true, filters, onChange, onSubmit }) => {
    const classes = useStyles();
    const [menuEl, setMenuEl] = useState(false);
    const [currentFilter, setCurrentFilter] = useState('');
    const filterBadge = Object.values(filters).filter(item => item.active).length;

    if (!show) {
        return null;
    }

    const handleMenuClick = (e, filterName) => {
        if (filterName != "backdropClick") {
            if (e.target.getAttribute('type') != 'checkbox') {

                if (!filters[filterName].active) {
                    onChange({
                        ...filters,
                        [filterName]: { ...filters[filterName], active: true }
                    });
                }

                setCurrentFilter(filterName);
            }
        } else {
            setMenuEl(null);
        }
    }

    const handleChangeCheckbox = async (filterName) => {
        let submit = false;
        const filter = { ...filters[filterName] };

        if (!filter.active) {
            setCurrentFilter(filterName);
        } else {
            submit = filter.value.length > 0;
            filter.value = [];
            setCurrentFilter('');
        }

        filter.active = !filter.active;

        if (submit) {
            onSubmit({ ...filters, [filterName]: filter });
        } else {
            onChange({ ...filters, [filterName]: filter });
        }
    }

    const handleSubmit = (value) => {
        onSubmit({
            ...filters,
            [currentFilter]: { ...filters[currentFilter], value }
        });
        setCurrentFilter('');
    }

    let FilterComponent;

    if (currentFilter) {
        const { type, label, value } = filters[currentFilter];

        FilterComponent = filterCreator[type].component({
            label,
            value,
            onSubmit: handleSubmit,
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
                {Object.values(filters).map(({ name, active, label }) => (
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

Filter.propTypes = {
    show: PropTypes.bool,
    filters: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
};

Filter.defaultProps = {
    onChange: () => { },
    onSubmit: () => { },
};

export default Filter;