import React from 'react';
import EntityCollectionPage from '~/hocs/EntityCollectionPage';
import MultipleSelectChip from '~c/common/Form/MultipleSelectChip';


const ProductsList = (props) => {
    const { entities } = props;


    return (
        <MultipleSelectChip
            name="categoriesIds"
            label="Product categories"
            emptyText="Without category"
            items={entities}
        />
    );
}

export default EntityCollectionPage({
    entityName: 'category',
    perPageOptions: [12],
    initialParams: {
        page: 1,
        limit: 12
    },
})(ProductsList);
