import { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import '../index.css';
import 'mapbox-gl/dist/mapbox-gl.css';

const MAPBOX_API_KEY = import.meta.env.VITE_MAPBOX_API_KEY;
const MAPBOX_STYLE = import.meta.env.VITE_MAPBOX_STYLE;

const MapComponent = ({ artistData }) => {
    const mapRef = useRef(null);
    const mapContainerRef = useRef(null);

    let fillColorExpression = ['match', ['get', 'name_en']];

    useEffect(() => {
        let countrySet = new Set();
        artistData.forEach(artist => {
            countrySet.add(artist.country);
        })

        countrySet.forEach(country => {
            fillColorExpression.push(country, '#00FF00');
        })
        fillColorExpression.push('rgba(0,0,0,0.5)');
    })

    useEffect(() => {
        mapboxgl.accessToken = MAPBOX_API_KEY;
        const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: MAPBOX_STYLE,
            center: [-20, 20],
            zoom: 2,
        });

        mapRef.current = map;

        map.on('load', () => {
            map.addSource('countries', {
                type: 'vector',
                url: 'mapbox://mapbox.country-boundaries-v1'
            });

            map.addLayer({
                id: 'countries',
                type: 'fill',
                source: 'countries',
                'source-layer': 'country_boundaries',
                layout: {},
                paint: {
                    'fill-color': fillColorExpression,
                    'fill-opacity': 0.3,
                },
            });

            map.addLayer({
                id: 'country-borders',
                type: 'line',
                source: 'countries',
                'source-layer': 'country_boundaries',
                layout: {},
                paint: {
                    'line-color': '#000000',
                    'line-width': 0.1,
                },
            }); // BORDERLINE STYLE
        });

        return () => {
            map.remove();
        };
    }, [artistData]);

    return <div id='map-container' ref={mapContainerRef} className='w-full h-full' />;
};

export default MapComponent;