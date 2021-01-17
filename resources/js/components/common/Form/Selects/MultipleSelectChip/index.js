import React, { useState } from 'react';
import { Field } from 'redux-form'
import { FormControl, InputLabel, Select, MenuItem, Input, Chip } from '@material-ui/core/';
import useStyles from './styles';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
    getContentAnchorEl: null,

    anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'left',
    },
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const renderSelect = ({ input, label, meta, onChange, items = [], emptyText = "Not selected", listItems, ...rest }) => {
    const classes = useStyles();
    let itemsTitle = {};

    items.forEach(item => itemsTitle[item.id] = item.title);

    return (
        <FormControl className={classes.formControl}>
            <InputLabel shrink>{label}</InputLabel>
            <Select
                multiple
                displayEmpty
                labelId={label}
                value={input.value || []}
                onChange={(e) => input.onChange(e.target.value)}
                input={<Input />}
                renderValue={selected => (
                    <div className={classes.chips}>
                        {selected.length > 0
                            ? selected.map((value) => (
                                <Chip
                                    key={value}
                                    label={itemsTitle[value]}
                                    className={classes.chip}
                                    color="primary"
                                    size="small"
                                />
                            ))
                            : (
                                <Chip
                                    key={emptyText}
                                    label={emptyText}
                                    className={classes.chip}
                                    size="small"
                                />
                            )
                        }
                    </div>
                )}
                MenuProps={MenuProps}
                {...rest}
            >
                {!listItems
                    ? items.length && items.map(({ id, title }) => (
                        <MenuItem key={title} value={id} >
                            {title}
                        </MenuItem>
                    ))
                    : listItems
                }
            </Select>
        </FormControl>
    )
}

const MultipleSelectChip = ({ label, name, ...rest }) => {
    const [enabled, setEnabled] = useState(false);

    return (
        <Field
            label={label}
            name={name}
            component={renderSelect}
            onChange={() => setEnabled(!enabled)}
            {...rest}
        />
    );
}

export default MultipleSelectChip;