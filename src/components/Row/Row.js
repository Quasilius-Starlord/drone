import { useRef } from "react";
import './../Overlay/Hide.css';

export default function Row(props){
    const ogIndex = props.rowData.ogIndex;
    const drone=props.rowData.drone;
    return(
        <tr className={ props.invisibilityClass } >
            <td>{drone.reg_id}</td>
            <td>{drone.drone_name}</td>
            <td>{drone.drone_type.model_name}</td>
            <td>{drone.pilot.name}</td>
            <td><button style={
                { height: '30px', width: '50px', color: 'black', backgroundColor: 'red' }
            } onClick={() => { props.deletevalue(ogIndex) }}>X</button></td>
        </tr>
    )
    return null;
};