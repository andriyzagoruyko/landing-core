import React from 'react';
import useTitle from '~/hooks/useTitle';

const Home = ({ history }) => {
    useTitle('Dashboard');

    return <div>Main page</div>;
};

export default Home;
