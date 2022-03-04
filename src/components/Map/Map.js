import React, { useEffect, useRef, useState } from "react";

import MapService from './MapService';

import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import 'mapbox-gl/dist/mapbox-gl.css';
import './Map.css';

export default function Map(props) {
    const mapService = useRef(null);
    if(mapService.current){
        if(props.drones.current){
            mapService.current.addPoints(props.drones.current.map(e=>{
                return [e.location.latitude, e.location.longitude]
            }))
        }
    }

    useEffect(() => {
        // initialize only once
        if (mapService.current) {
            return;
        }
        const mapObj = new MapService();
        mapObj.initMap();
        mapService.current = mapObj;
        

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
        <div id={MapService.MAP_CONTAINER} className='map'></div>
    )
}