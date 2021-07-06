import React from 'react';
import FakeData from '../../fakedata/fakeData.json'
import Vehicle from '../Vehicle/Vehicle.js';

const Home = () => {
    const dataLoad = FakeData;
    return (
        <div className="home">
            {
                dataLoad.map(tp => <Vehicle transport={tp} key={tp.id} ></Vehicle>)
            }
            
        </div>
    );
};

export default Home;
