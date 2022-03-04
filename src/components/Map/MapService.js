import { Component, useEffect } from 'react';

import mapboxgl, { Map } from 'mapbox-gl';
import MapboxDraw from "@mapbox/mapbox-gl-draw";

import MarkerImage from '../../assets/images/marker.png';
import data from './../../assets/data/largetestdataforupload.json';

// NOTE: Add you mapbox token here
export const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1Ijoic2luLXNpbmF0cmEiLCJhIjoiY2t3cDI2MjdrMDhrNzJ2cDNkMW95b2E0cSJ9.sRbQfiDOUET9TL5HLNR0GQ'

/**
 * Singleton class holding map instance and does
 * all map related operations
 */


export default class MapService extends Component {

    constructor(props) {
        super(props);
        mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN

        if (!Map.INSTANCE) {
            Map.INSTANCE = this;
        }
        // console.log(data[0].location)
        return Map.INSTANCE;
    }

    static INSTANCE = null;
    static MAP_CONTAINER = 'project_map';

    map = null;
    drawTool = null;

    drawnBoundingBox = null;
    drawnPoints = [];

    /**
     * Private method, to initilize map
     */



    componentDidMount() {
        console.log('done')
        console.log(data[0])
    }

    
    initMap() {
        if (this.map || !MAPBOX_ACCESS_TOKEN) {
            return;
        }

        this.map = new Map({
            container: 'project_map',
            style: 'mapbox://styles/mapbox/satellite-streets-v9?optimize=true',
        })

        this.map.addControl(
            new mapboxgl.NavigationControl({
                showCompass: false,
            }),
        );

        this.map.dragRotate.disable();

        this.map.loadImage(
            MarkerImage,
            (error, image) => {
                if (error) {
                    throw error;
                }
                if (!this.map.hasImage('imageMarker')) {
                    this.map.addImage('imageMarker', image);
                }
            }
        );

        this.map.on('load', () => {
            this.map.resize();
        })

        this.initDrawTool();

        this.map.on('load',()=>{
            // console.log('sty;le event loaded');
            const coordinates = [];
            // for (let i = 0; i < 10; i++) {
            //     coordinates.push([data[i].location.latitude,data[i].location.longitude])
            //     console.log(data[i].location)
            // }
            // coordinates.push([0,0])
            this.addPoints(coordinates);
        })
    }

    /**
     * Private method to add drawing tool on the map
     */
    initDrawTool() {
        this.drawTool = new MapboxDraw({
            userProperties: true,
            displayControlsDefault: false,
            controls: {
                polygon: true,
                trash: true,
            },
        });
        this.map.addControl(this.drawTool);

        // Makes sure that user can only draw one annotation
        // at a time, to make things easy
        this.map.on('draw.modechange', () => {
            if (this.drawTool.getAll().features.length <= 1) {
                return;
            }
            this.drawTool.delete(this.drawTool.getAll().features[0].id);
        });

        this.map.on('draw.create', (geojson) => {
            this.drawnBoundingBox = geojson.features[0]
        });

        this.map.on('draw.update', (geojson) => {
            this.drawnBoundingBox = geojson.features[0]
        });

        this.map.on('draw.delete', (geojson) => {
            this.drawnBoundingBox = null
        });
    }

    /**
     * Private method to add or update the marker source
     * @param {object[]} features Array of feature object
     * @returns Void
     */
    addOrUpdateMarkerSource(features) {
        const source = this.map.getSource('markerSource');

        // Update source data if source exist
        if (source) {
            source.setData({
                type: 'FeatureCollection',
                features: features,
            });
            return;
        }

        this.map.addSource('markerSource', {
            type: 'geojson',
            data: {
                type: 'FeatureCollection',
                features: features,
            },
        });
    }

    /**
     * Private method to add map layer to plot markers for coordinates
     * @returns void
     */
    addMarkerLayer() {
        if (this.map.getLayer('markerLayer')) {
            return;
        }

        const layer = {
            id: 'markerLayer',
            type: 'symbol',
            source: 'markerSource',
            layout: {
                'icon-image': 'imageMarker',
                'icon-size': 0.2,
                'icon-allow-overlap': true,
                'visibility': 'visible',
            },
        };

        this.map.addLayer(layer);
    }

    /**
     * Public method to plot array of coordinates as points on the map
     * @param {number[][]} coordinates Array of coordinate, each coordinate
     * is an array like this - [longitude, latitude]
     */
    addPoints(coordinates) {
        if (!coordinates.length) {
            // return;
        }

        const features = [];
        coordinates.forEach(coord => {
            const point = {
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: coord
                },
                properties: {},
            };
            features.push(point);
        })

        this.addOrUpdateMarkerSource(features);
        this.addMarkerLayer();
    }

    /**
     * Public method to return drawn bounding box
     * @returns Feature
     */
    getdrawnBoundingBox() {
        return this.drawnBoundingBox;
    }

    getMapObj(){
        return this.map;
    }
}