import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
    width: '50%',
    height: '600px',
    marginLeft: 'auto',
    marginTop: '50px'
};

const position = {
    lat: 23.810331,
    lng: 90.412521
};

const onLoad = marker => {
    console.log('marker: ', marker)
}

const Map = () => {
    return (
        <LoadScript
            googleMapsApiKey="AIzaSyAeNZyfI_lZXXghxG3kBAimFXk_iTC4hdU"
        >
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={position}
                zoom={10}
            >
                <Marker
                    onLoad={onLoad}
                    position={position}
                />
            </GoogleMap>
        </LoadScript>
    );
};

export default Map;