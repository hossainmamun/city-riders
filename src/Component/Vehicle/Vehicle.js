import React from 'react';
import { Link } from 'react-router-dom';

const Vehicle = (props) => {
    const { name, image, id } = props.transport;

    return (
        <Link to={`/destination/`}>
            <button className="vehicle">
                <img src={image} alt="" />
                <p>{name}</p>
            </button>
        </Link>
    );
};

export default Vehicle;