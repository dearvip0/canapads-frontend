import React, { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import { dataLayerClusterCount, dataLayerClusters, dataLayerUnclustered } from './layer_data/layer_data';
import AdPopup from './AdPopup';

mapboxgl.accessToken = 'pk.eyJ1IjoiamVibzg3IiwiYSI6ImNqbG9tMHp1NDF2ZWszd29zcnE0NDJlbWUifQ.72FOq2s1Hw_u9fJ2EBzViA';

const MapCanapads = (props) => {
	const mapRef = useRef(null);
	const [ viewPort, setViewPort ] = useState({
		width: 'auto',
		height: '100vh',
		center: [ props.lon, props.lat ],
		zoom: 11,
		maxZoom: 16,
		minZoom: 5
	});
	const [ data, setData ] = useState(props.data);
	const [ myMap, setMap ] = useState(null);

	useEffect(
		() => {
			const initializeMap = ({ setMap, mapRef }) => {
				const map = new mapboxgl.Map({
					container: mapRef.current,
					style: 'mapbox://styles/jebo87/cjlqq3orh50px2rph1d2vnbqd',
					...viewPort
				});
				const flyToStore = (currentFeature) => {
					map.flyTo({
						center: currentFeature.geometry.coordinates,
						zoom: 14
					});
				};
				map.on('load', () => {
					map.addSource('listings', {
						type: 'geojson',
						data: {
							...props.data
						}
					});
					// map.addLayer(dataLayerClusters);
					// map.addLayer(dataLayerClusterCount);
					map.addLayer({
						...dataLayerUnclustered
					});
					setMap(map);
					map.on('click', (e) => {
						console.log('entro al handler');
						var features = map.queryRenderedFeatures(e.point, {
							layers: [ 'listings' ]
						});
						if (features.length) {
							flyToStore(features[0]);

							var coordinates = features[0].geometry.coordinates.slice();
							var listing = features[0].properties;
							new mapboxgl.Popup()
								.setLngLat(coordinates)
								.setHTML(
									`<div>
									<div>
											${listing.title} 
										<a target="_new" href={"http://en.wikipedia.org/w/index.php?title=Special:Search&search"}>
											Wikipedia
										</a>
									</div>
									<img width=120 src=${listing.image} />
								</div>`
								)
								.addTo(map);
						}
					});
				});
			};
			if (!myMap) initializeMap({ setMap, mapRef });
			// if (mapRef != null) {
			// 	console.log(props.data);
		},
		[ myMap ]
	);
	useEffect(
		() => {
			console.log('data has changed');
			console.log(myMap);
			if (myMap != null) {
				myMap.removeLayer('listings');
				myMap.removeSource('listings');
				myMap.addSource('listings', {
					type: 'geojson',
					data: {
						...props.data
					}
				});
				myMap.addLayer({
					...dataLayerUnclustered
				});
				setMap(myMap);
			}
		},
		[ props.data ]
	);

	return <div ref={(el) => (mapRef.current = el)} className="map" />;
};
export default MapCanapads;
