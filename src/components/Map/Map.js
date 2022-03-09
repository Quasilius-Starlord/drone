/* eslint-disable */
import React, { useEffect, useRef, useState } from "react";
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
// import MapService from './MapService';
import mapboxGlDraw from "@mapbox/mapbox-gl-draw";
import MarkerImage from '../../assets/images/marker.png';
// import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
// import 'mapbox-gl/dist/mapbox-gl.css';
// import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
// import 'mapbox-gl/dist/mapbox-gl.css';
// import './Map.css';

export const MAPBOX_ACCESS_TOKEN='pk.eyJ1Ijoic2luLXNpbmF0cmEiLCJhIjoiY2t3cDI2MjdrMDhrNzJ2cDNkMW95b2E0cSJ9.sRbQfiDOUET9TL5HLNR0GQ'

const geojson = {
    type: 'FeatureCollection',
    features: [
        {
        type: 'Feature',
        geometry: {
            type: 'Point',
            coordinates: [-77.032, 38.913]
        },
        properties: {
            title: 'Mapbox',
            description: 'Washington, D.C.'
        }
        },
        {
        type: 'Feature',
        geometry: {
            type: 'Point',
            coordinates: [-122.414, 37.776]
        },
        properties: {
            title: 'Mapbox',
            description: 'San Francisco, California'
        }
        }
    ]
};


export function Map(props) {
    const mapService = useRef(null);
    const mapContainer = useRef(null);
    const drawnBoundingBox = useRef(null);
    const [ drawnPoints, setDrawnPoints ] = useState([]);

    function addOrUpdateMarkerSource(points){
        const source=mapService.current.getSource('markerSource');

        if(source){
            source.setData({
                type: 'FeatureCollection',
                features: points
            })
            return;
        }

        mapService.current.addSource('markerSource',{
            type:'geojson',
            data:{
                type: 'FeatureCollection',
                features: points,
            }
        })
    }

    function addMarkerLayer(){
        if(mapService.current.getLayer('markerLayer'))
            return;
        
        const layer={
            id: 'markerLayer',
            type: 'symbol',
            source: 'markerSource',
            layout: {
                'icon-image': 'imageMarker',
                'icon-size': 0.2,
                'icon-allow-overlap': true,
                'visibility': 'visible',
            },
        }

        mapService.current.addLayer(layer)
    }

    function addCoordinates(coordinates){
        const points=[]
    
        coordinates.forEach(element => {
            const point={
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: element
                },
                properties: {},
            }
            points.push(point);
        });
        addOrUpdateMarkerSource(points)
        addMarkerLayer();
    }

    if(mapService.current){
        addCoordinates(props.dronesLocations.current)
    }

    useEffect(() => {
        // initialize only once
        if (mapService.current) {
            return;
        }

        //create map and draw settings and controls
        mapboxgl.accessToken=MAPBOX_ACCESS_TOKEN
        mapService.current=new mapboxgl.Map({
            container:mapContainer.current,
            style: 'mapbox://styles/mapbox/satellite-streets-v9?optimize=true'
        })
        mapService.current.dragRotate.disable();
        
        mapService.current.on('load',()=>{
            console.log('map loaded')
        })
        const draw=new mapboxGlDraw({
            userProperties: true,
            displayControlsDefault:false,
            controls:{
                polygon:true,
                trash:true
            }
        });
        mapService.current.addControl(draw)
        mapService.current.addControl(new mapboxgl.NavigationControl())

        mapService.current.on('load',()=>{
            console.log('map has been loaded')
            
        })
        
        //marker image load
        mapService.current.loadImage(MarkerImage,(error,image)=>{
            if (error)
                throw error;
            
            if (!mapService.current.hasImage('imageMarker')) {
                console.log('loading image',image)
                mapService.current.addImage('imageMarker', image);
            }
        })

        // draw functionality
        mapService.current.on('draw.create',geojson=>{
            console.log('deleted bounded box')

            props.boundedBox.current=geojson.features[0];
        })

        mapService.current.on('draw.update',geojson=>{
            console.log('deleted bounded box')

            props.boundedBox.current=geojson.features[0];
        })

        mapService.current.on('draw.delete',geojson=>{
            console.log('deleted bounded box')
            props.boundedBox.current=geojson.features[0];
            props.setRenderforcecounter(Math.floor(Math.random()*100))
        })

        console.log(mapService.current)

        // this.map.on('draw.modechange', () => {
        //     if (this.drawTool.getAll().features.length <= 1) {
        //         return;
        //     }
        //     this.drawTool.delete(this.drawTool.getAll().features[0].id);
        // });
        // mapService.current.on('draw.create', (geojson) => {
        //     drawnBoundingBox.current = geojson.features[0]
        // });
        
        // mapService.current.on('draw.update', (geojson) => {
            //     drawnBoundingBox.current = geojson.features[0]
            // });
            
            // mapService.current.on('draw.delete', (geojson) => {
                //     drawnBoundingBox.current = null
                // });

                
                // const mapObj = new MapService();
                // mapObj.initMap();
                // mapService.current = mapObj;
                
                
                // mapService.current.addPoints([10,10])
                
                
                
                // --------------------DEMO STARTS--------------------
        
                // This is just a demo on how you can use the map service
        // object to interact with map. Comment this once done

        // Plotting example coordinates around the world
        // setTimeout(() => {
            //     const coordinates = [
                //         [-73.98937555487292, 40.731965091993914],
                //         [-73.73039553412251, 40.796010867586915],
                //         [-77.09504020359414, 41.84349668210635],
                //         [83.5185031029784, 25.245912019460548],
                //         [76.29383629670303, 21.650294218910247],
                //         [77.9497006582406, 13.116597167456476],
                //     ];
                //     mapService.current.addPoints(coordinates);
                // }, 0);
                
                // Plotting point inside india only
                // setTimeout(() => {
                    //     const updatedCoordinates = [
                        //         // [83.5185031029784, 25.245912019460548],
        //         [76.29383629670303, 21.650294218910247],
        //         [77.9497006582406, 13.116597167456476]
        //     ];
        //     mapService.current.addPoints(updatedCoordinates);
        // }, 4000)

        // -----------------DEMO ENDS---------------------------
        
    },[])

    return (
        <div ref={mapContainer} className='map-container'></div>
    )
}