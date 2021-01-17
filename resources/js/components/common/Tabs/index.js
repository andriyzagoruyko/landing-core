import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab } from '@material-ui/core/';

const TabsContainer = ({ tabs = [], children, ...props }) => {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <>
            <Tabs value={activeTab} onChange={(e, newTab) => setActiveTab(newTab)}  {...props}>
                {tabs.map(value => <Tab key={value} label={value} />)}
            </Tabs>
            {children[activeTab]}
        </>
    );
}

TabsContainer.propTypes = {
    tabs: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default TabsContainer;