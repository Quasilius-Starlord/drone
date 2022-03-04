import 'bootstrap/dist/css/bootstrap.min.css';
import './../Overlay/Overlay.css';
import './../Overlay/Hide.css';
import './../Overlay/Content.css'
import { ProgressBar } from 'react-bootstrap'

export default function UploadOverlay(props){
    let triggerhidden=null;
    let uploadedBarLabel=props.uploadedPercent<100 ? `${props.uploadedPercent}%` : 'Upload Complete';

    return(
        <div className={ props.visibility==='Hide' ? props.visibility : `Background`} ref={ node=>triggerhidden=node } onClick={e=>{
            if(triggerhidden===e.target){
                console.log('hide now')
                props.setProgressBarVisibility();
            }
        }} >
            <div style={{backgroundColor:'white',width:'80%',height:'20%', alignItems:'center'}} className='Content'>
                <ProgressBar now={props.uploadedPercent} variant='info' label={uploadedBarLabel} animated style={{width:'80%'}}/>
            </div>
        </div>
    )
}