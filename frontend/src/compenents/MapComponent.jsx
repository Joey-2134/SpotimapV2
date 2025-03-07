import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MAPTILER_API_KEY = import.meta.env.VITE_MAPTILER_KEY; // Replace with your actual API key

const MapComponent = () => {
    return (
        <MapContainer
            center={[51.505, -0.09]}
            zoom={3}
            style={{ height: '1000px', width: '100%' }}
        >
            <TileLayer
                url={`https://api.maptiler.com/maps/dataviz-dark/{z}/{x}/{y}.png?key=${MAPTILER_API_KEY}`}
                attribution='&copy; <a href="https://www.maptiler.com/">MapTiler</a> contributors'
            />
        </MapContainer>
    );
};

export default MapComponent;
