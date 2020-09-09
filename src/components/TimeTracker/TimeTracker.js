import React from 'react'
import Countdown from 'react-countdown';
import Aux from '../../hoc/Aux/Aux'
import ProgressBar from './ProgressBar/ProgressBar'

const timeTracker = (props) => {
    
    let countdown = props.currentPhaseIndex != null ? <Countdown key={Date.now()} onComplete={props.onComplete}  date={Date.now() + (props.countdownTimeInMinutes*60000)} /> : null
    let progressBar = props.currentPhaseIndex != null ? <ProgressBar style={{display: "block"}} phasesTimeline={props.phasesTimeline} currentPhaseIndex={props.currentPhaseIndex}/> : null
    
    return(
        <Aux>
            {progressBar}
            {countdown}
        </Aux>   
    ) 
}

export default timeTracker;


//(props.countdownTimeInMinutes*60000)