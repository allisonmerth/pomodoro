import React from 'react'
import Countdown from 'react-countdown';
import Aux from '../../hoc/Aux/Aux'
import ProgressBar from './ProgressBar/ProgressBar'
import classes from './TimeTracker.module.css';

const renderer = ({ minutes, seconds }) => {
    debugger;
      let countdown = (
        <div>
            <p className={classes.Countdown}> <span className={classes.Number}>{minutes}</span> minutes <span className={classes.Number}>{seconds}</span>  seconds</p>
        </div>        
      )
      return countdown;
  };

const timeTracker = (props) => {
    
    let countdown = props.currentPhaseIndex != null ? <Countdown key={Date.now()} renderer={renderer} onComplete={props.onComplete}  date={Date.now() + (props.countdownTimeInMinutes*60000)} /> : null
    let progressBar = props.currentPhaseIndex != null ? <ProgressBar id="countdown" phasesTimeline={props.phasesTimeline} currentPhaseIndex={props.currentPhaseIndex}/> : null
    
    return(
        <Aux>
            {progressBar}
            {countdown}
        </Aux>   
    ) 
}

export default timeTracker;


//(props.countdownTimeInMinutes*60000)