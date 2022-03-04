import './Overlay.css';
import './Hide.css';
import './Content.css';
import Auxil from './../Auxil/Auxil.js'
import { useState, useRef } from 'react';
import axios from 'axios'

export default function Overlay(props){
    let triggerhidden=null;

    // const processState=useRef(false);
    const [currSelectedFile, changeSelectedFile]=useState(null);
    const selectedFileName = useRef('')
    let processCurrSelected=()=>{
        if(currSelectedFile){
            return(
                <Auxil>
                    <div style={{fontSize:'2em', fontFamily:['Cinzel', 'serif']}}>File Selected</div>
                    <div style={{fontSize:'1.5em', fontFamily:['Cinzel', 'serif']}}>Name: {selectedFileName.current}</div>
                    {/* {currSelectedFile.slice(0,4).map((ele, i)=>{return (<div key={i}>{`${i+1}. Name ${ele.drone_name} ${ele.location.latitude},${ele.location.longitude}`}</div>)})} */}
                </Auxil>
            )
        }else{
            return(
                <div>No file selected</div>
            )
        }
    }
    console.log(props.invisibility)
    return(
        <div className={ props.invisibility==='Hide' ? props.invisibility : `Background`}
         onClick={e=>{
            if(triggerhidden===e.target)
                props.setInvisibility(e);
         }}
         ref={node=>{triggerhidden=node}} >
            <div className={`Content`} style={{display:'flex',flexDirection:'column',justifyContent:'space-evenly',alignItems:'center'}}>
                <input className='form-control' style={{width:'70%',fontFamily:['Cinzel', 'serif']}} type='file' onChange={e=>{
                    const fileReader = new FileReader();
                    fileReader.readAsText(e.target.files[0],'UTF-8');
                    selectedFileName.current=`${e.target.files[0].name}`
                    console.log(e.target.files[0].name)
                    //  file is in selectedfile
                    console.log('drone json', props.droneJsonData);
                    //  json stored in the state
                    fileReader.onload=e=>{
                        let jsonmapdata=JSON.parse(e.target.result);
                        changeSelectedFile(jsonmapdata);
                        props.droneJsonData.current=jsonmapdata;
                        props.setInvisibility(triggerhidden);
                    }
                    e.target.value='';
                }} accept='.json'/>
                {processCurrSelected()}
            </div>
        </div>
    )
};