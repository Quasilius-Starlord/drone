import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Button,/* ProgressBar*/ } from "react-bootstrap";
import DroneTable from "../DroneTable/DroneTable";

import Map from '../Map/Map';
import MapService, { MAPBOX_ACCESS_TOKEN } from '../Map/MapService';
import Overlay from "../Overlay/Overlay";
import UploadOverlay from "../UploadOverlay/UploadOverlay";
import './Layout.css';
import { URL } from './../../assets/backend/server'

export default function Layout() {
    console.log(URL)
    const mapService = useRef(null);
    const droneJsonData = useRef(null);
    

    const newdata = useRef([
        {
            "drone_name": "Ritvik",
            "reg_id": 1,
            "location": {
                "latitude": 26.027207835264562,
                "longitude": 85.05834646542837
            },
            "last_seen": "2021-02-20 01:11:37",
            "first_launch": "2021-02-02 13:43:52",
            "total_flight_time_min": 128,
            "drone_type": {
                "id": 37,
                "model_name": "Mini pro",
                "brand": "DJI",
                "model_year": "2016",
                "endurance_min": "24",
                "sl_no": "082-23-8151",
                "type": "quad"
            },
            "pilot": {
                "id": 3637,
                "name": "Rania Tak",
                "address": "702\nCheema Street\nBerhampore-250764",
                "phone": "07435013056",
                "experience": 1,
                "skill": 3,
                "country": "India"
            }
        },
        {
            "drone_name": "Aarush",
            "reg_id": 2,
            "location": {
                "latitude": 20.50261768211302,
                "longitude": 79.56760337007684
            },
            "last_seen": "2021-03-23 18:13:02",
            "first_launch": "2019-04-03 01:35:42",
            "total_flight_time_min": 302,
            "drone_type": {
                "id": 6,
                "model_name": "DJI Mavic v3",
                "brand": "DJI",
                "model_year": "2018",
                "endurance_min": "23",
                "sl_no": "282-62-3373",
                "type": "quad"
            },
            "pilot": {
                "id": 8382,
                "name": "Arnav Sura",
                "address": "84/303, Jhaveri Zila, Panvel 306201",
                "phone": "09246416699",
                "experience": 2,
                "skill": 1,
                "country": "India"
            }
        },
        {
            "drone_name": "Tiya",
            "reg_id": 3,
            "location": {
                "latitude": 23.89430689372223,
                "longitude": 75.4822003284608
            },
            "last_seen": "2021-03-18 02:42:27",
            "first_launch": "2020-03-13 16:40:37",
            "total_flight_time_min": 929,
            "drone_type": {
                "id": 41,
                "model_name": "Swinf pro 2",
                "brand": "Parrot",
                "model_year": "2020",
                "endurance_min": "120",
                "sl_no": "784-19-1278",
                "type": "vtol"
            },
            "pilot": {
                "id": 3631,
                "name": "Shalv Wagle",
                "address": "H.No. 87, Setty Ganj, Morena-429574",
                "phone": "08396022723",
                "experience": 1,
                "skill": 1,
                "country": "India"
            }
        }, {
            "drone_name": "Drishya",
            "reg_id": 4,
            "location": {
                "latitude": 21.62317233330305,
                "longitude": 77.17200839547803
            },
            "last_seen": "2021-06-28 19:21:46",
            "first_launch": "2019-08-25 06:29:43",
            "total_flight_time_min": 163,
            "drone_type": {
                "id": 9,
                "model_name": "DJI Phantom",
                "brand": "DJI",
                "model_year": "2020",
                "endurance_min": "23",
                "sl_no": "935-55-4918",
                "type": "quad"
            },
            "pilot": {
                "id": 7513,
                "name": "Kismat Kibe",
                "address": "677\nAurora Chowk, Bijapur-582281",
                "phone": "7355047528",
                "experience": 2,
                "skill": 5,
                "country": "India"
            }
        },
        {
            "drone_name": "Urvi",
            "reg_id": 5,
            "location": {
                "latitude": 16.716535536139276,
                "longitude": 81.41942167640791
            },
            "last_seen": "2021-04-11 14:31:20",
            "first_launch": "2021-05-11 04:28:46",
            "total_flight_time_min": 599,
            "drone_type": {
                "id": 26,
                "model_name": "Anaconda",
                "brand": "RMRC",
                "model_year": "2012",
                "endurance_min": "120",
                "sl_no": "372-21-5803",
                "type": "fixed_wing"
            },
            "pilot": {
                "id": 2780,
                "name": "Fateh Taneja",
                "address": "63\nMaster Marg, Sambhal-748966",
                "phone": "1682303931",
                "experience": 2,
                "skill": 3,
                "country": "India"
            }
        },
        {
            "drone_name": "Fateh",
            "reg_id": 6,
            "location": {
                "latitude": 23.279140451156152,
                "longitude": 74.6538249049942
            },
            "last_seen": "2021-07-23 17:19:06",
            "first_launch": "2021-04-30 20:24:07",
            "total_flight_time_min": 276,
            "drone_type": {
                "id": 27,
                "model_name": "Anaconda v2",
                "brand": "RMRC",
                "model_year": "2013",
                "endurance_min": "150",
                "sl_no": "575-32-9168",
                "type": "fixed_wing"
            },
            "pilot": {
                "id": 1311,
                "name": "Manikya Atwal",
                "address": "47\nKohli Marg\nHajipur 811328",
                "phone": "6911714068",
                "experience": 3,
                "skill": 2,
                "country": "India"
            }
        },
        {
            "drone_name": "Nishith",
            "reg_id": 7,
            "location": {
                "latitude": 26.069584602576576,
                "longitude": 77.55016833507528
            },
            "last_seen": "2021-08-27 21:09:45",
            "first_launch": "2018-07-07 00:35:54",
            "total_flight_time_min": 775,
            "drone_type": {
                "id": 23,
                "model_name": "Talon v4",
                "brand": "X-UAV",
                "model_year": "2018",
                "endurance_min": "32",
                "sl_no": "543-76-7761",
                "type": "fixed_wing"
            },
            "pilot": {
                "id": 4512,
                "name": "Anvi Sinha",
                "address": "H.No. 96\nJain Ganj, Hapur-027292",
                "phone": "7308158224",
                "experience": 1,
                "skill": 1,
                "country": "India"
            }
        },
        {
            "drone_name": "Raunak",
            "reg_id": 8,
            "location": {
                "latitude": 23.816962049757436,
                "longitude": 83.48164288218572
            },
            "last_seen": "2021-07-29 00:35:12",
            "first_launch": "2020-04-06 08:03:05",
            "total_flight_time_min": 468,
            "drone_type": {
                "id": 13,
                "model_name": "DJI Phantom v4",
                "brand": "DJI",
                "model_year": "2019",
                "endurance_min": "43",
                "sl_no": "721-27-2336",
                "type": "quad"
            },
            "pilot": {
                "id": 8911,
                "name": "Kismat Buch",
                "address": "42/05, Subramanian Circle, Bhagalpur-298270",
                "phone": "04857609656",
                "experience": 4,
                "skill": 4,
                "country": "India"
            }
        },
        {
            "drone_name": "Madhup",
            "reg_id": 9,
            "location": {
                "latitude": 17.586743841462322,
                "longitude": 80.71235647107518
            },
            "last_seen": "2021-09-18 12:08:19",
            "first_launch": "2020-06-10 19:17:24",
            "total_flight_time_min": 838,
            "drone_type": {
                "id": 41,
                "model_name": "Swinf pro 2",
                "brand": "Parrot",
                "model_year": "2020",
                "endurance_min": "120",
                "sl_no": "784-19-1278",
                "type": "vtol"
            },
            "pilot": {
                "id": 7659,
                "name": "Vaibhav Desai",
                "address": "H.No. 301, Goda, Ulhasnagar-934350",
                "phone": "+916206972111",
                "experience": 3,
                "skill": 2,
                "country": "India"
            }
        }
    ]);

    let [invisibility, setInvisibility] = useState('Hide');
    let [progressBarVisibility, setProgressBarVisibility] = useState('Hide');
    let [uploadedPercent, changeUploadedPercent] = useState(0);

    let overlayMonitor = e => {
        if (!invisibility) {
            setInvisibility('Hide')
        } else
            setInvisibility('');
    };

    let ProgressBarVisibilityMonitor = e => {
        if (!progressBarVisibility) {
            setProgressBarVisibility('Hide')
        } else
            setProgressBarVisibility('');
    };

    let uploadFile = () => {
        console.log(droneJsonData.current, 'uploaded')
        setProgressBarVisibility();
        let data = new FormData();
        data.append('file', JSON.stringify(droneJsonData.current));
        changeUploadedPercent(0);
        const options = {
            onUploadProgress: progressEvent => {
                let percent = Math.floor((progressEvent.loaded / progressEvent.total) * 100);
                changeUploadedPercent(percent)
                console.log(progressEvent, uploadedPercent)
            }
        }

        axios.post(`${URL}/dronedata/`, data, options).then(res => {
            console.log(res);
        })
        return;
    }

    useEffect(() => {
        //initialize only once
        if (mapService.current) {
            return;
        }
        //mapservice set to hook which is map object
        const mapObj = new MapService();
        mapObj.initMap();
        mapService.current = mapObj;
        console.log('has been rendered');
    }, []);

    // //function defination of the bounded box drawn by user
    function getBoundingBox() {
        const bbox = mapService.current.getdrawnBoundingBox();
        if (!bbox) {
            return;
        }
        console.log(bbox.geometry.coordinates[0]);
        fetch(`${URL}/locationfetch/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 'polygon': bbox.geometry.coordinates[0] })
        }).then(res => {
            return res.json()
        }).then(res => {
            console.log(JSON.parse(res).data)
            alert(JSON.parse(res).data)
        })
    }
    console.log(URL)
    return (
        <div className='layout'>
            <Overlay droneJsonData={droneJsonData} invisibility={invisibility} setInvisibility={overlayMonitor} mapService={mapService} />
            <UploadOverlay
                visibility={progressBarVisibility}
                setProgressBarVisibility={ProgressBarVisibilityMonitor}
                uploadedPercent={uploadedPercent} />
            <div className='layout__content_cont'>
                <div style={{ padding: '1em', display: 'flex', justifyContent: 'space-evenly' }}>
                    <Button variant="success" onClick={(e) => overlayMonitor(e)}>
                        Add JSON File
                    </Button>
                    <Button variant="success" onClick={uploadFile}>
                        Upload
                    </Button>
                </div>
                <DroneTable
                 drones={droneJsonData}
                 itemsPerPage={4} />

                
                <div style={{display:"flex",justifyContent:'center'}}>
                    <Button variant="info" onClick={getBoundingBox}>
                        Get drone in bounded Box
                    </Button>
                </div>
                <p style={{fontFamily:['Cinzel', 'serif'], textAlign:'center', marginTop:'10px'}}>
                    download sample data <a href="./../../assets/data/largetestdataforupload.json" download>here</a>
                </p>
            </div>

            <div className='layout__map_cont'>
                {MAPBOX_ACCESS_TOKEN && <Map drones={droneJsonData} />}
            </div>

        </div>
    );
};
