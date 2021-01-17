import React from 'react';
import { filterArrayByKeyword } from '~/helpers/array';
import { Menu, IconButton, Checkbox, Box, List, ListItem, Collapse } from '@material-ui/core/';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Search from '~c/common/Search'
import { Chips } from '~c/common/Form/';

const filterCategories = (items = [], keyword) => {
    if (keyword.length) {
        return filterArrayByKeyword(items, keyword, 'children')
            .sort(item => item.categories && item.categories.length ? -1 : 0);
    }

    return items;
}

const CategoriesItem = ({ item, selected = [], onSelect, except, padding = 0 }) => {
    const [opened, setOpened] = React.useState(false);
    const hasChildren = item.children && item.children.length > 0;

    const handleCick = (e) => !e.target.closest('button') && onSelect(item);

    return (
        <>
            <ListItem disabled={item.id === except} button component="li" onClick={handleCick}>
                <Box pl={padding}>
                    {hasChildren && (
                        <IconButton size="small" onClick={() => setOpened(!opened)}>
                            {opened ? <ExpandLess /> : <ExpandMore />}
                        </IconButton>
                    )}
                    <Checkbox
                        size="small"
                        checked={selected.includes(item.id)}
                        onChange={() => onSelect(item)}
                    />
                    {item.title}
                </Box>
            </ListItem>

            {hasChildren && (
                <Collapse in={opened} timeout="auto" unmountOnExit>
                    <CategoriesList
                        items={item.children}
                        selected={selected}
                        onSelect={onSelect}
                        padding={padding + 2}
                        except={except}
                    />
                </Collapse>
            )}
        </>
    );
}

const CategoriesList = ({ items, selected, onSelect, except, padding = 0 }) => {
    console.log(except);
    return (
        <List>
            {!items.length
                ? <ListItem component="li" style={{ justifyContent: 'center' }}>Not found</ListItem>
                : items.map(item => (
                    <CategoriesItem
                        key={item.id}
                        item={item}
                        selected={selected}
                        onSelect={onSelect}
                        padding={padding}
                        except={except}
                    />)
                )}
        </List>
    );
}

const CategoriesSelect = ({ label, items, selectedItems, selected = [], except, emptyText, onChange, multiple }) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [search, setSearch] = React.useState('');

    const handleOpen = (e) => setAnchorEl(anchorEl ? null : e.currentTarget);
    const handleClose = () => setAnchorEl(null);
    const handleDelete = ({ id }) => {
        if (multiple) {
            onChange(selected.filter(i => i !== id));
        } else {
            onChange('');
        }
    };
    const handleSelect = ({ id }) => {
        if (multiple) {
            onChange(selected.includes(id) ? selected.filter(i => i !== id) : selected.concat([id]));
        } else {
            onChange(selected.includes(id) ? '' : id);
        }
    };

    return (
        <>
            <Chips
                label={label}
                items={selectedItems}
                emptyText={emptyText}
                onClick={handleOpen}
                onDelete={handleDelete}
            />
            <Menu
                variant="menu"
                style={{ maxHeight: 500 }}
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={handleClose}
                getContentAnchorEl={null}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                transformOrigin={{ vertical: 'top', horizontal: 'left' }}
            >
                <Box p={1}>
                    <Search value={search} onChange={(val) => { console.log(val); setSearch(val) }} />
                    <CategoriesList
                        items={filterCategories(items, search, except) || []}
                        selected={selected || []}
                        onSelect={handleSelect}
                        except={except}
                    />
                </Box>
            </Menu>
        </>
    );
}

export default CategoriesSelect;