import { useRef, useEffect } from 'react'
import mapboxgl from 'mapbox-gl'
import '../index.css'
import 'mapbox-gl/dist/mapbox-gl.css';

const MAPBOX_API_KEY = import.meta.env.VITE_MAPBOX_API_KEY;

const MapComponent = () => {
    const mapRef = useRef(null)
    const mapContainerRef = useRef(null)

    useEffect(() => {
        mapboxgl.accessToken = MAPBOX_API_KEY
        mapRef.current = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: "mapbox://styles/joey2134/clsn1v4c1000901pk4rodg01u",
            center: [-122.4194, 37.7749], // Example: San Francisco
            zoom: 3,
        });

        return () => {
            mapRef.current.remove()
        }
    }, [])

    return (
        <>
            <div id='map-container' ref={mapContainerRef}/>
        </>
    )
};

export default MapComponent;
