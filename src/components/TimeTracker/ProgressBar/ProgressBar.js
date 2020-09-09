import React from 'react'
import Aux from '../../../hoc/Aux/Aux'

const progressBar = (props) => {
    const phases = {
        "task": "Task",
        "shortBreak": "Short Break",
        "longBreak": "Long Break"
    }
    
    let phasesBar = []
    for (let i = 0; i < props.phasesTimeline.length; i++) {
        let phase = props.phasesTimeline[i]
        
        let backgroundColor = "green"
        if (i == props.currentPhaseIndex) {
            backgroundColor = "red"
        }        
        
        phasesBar.push(<div style={{backgroundColor: backgroundColor}}>{phases[phase]}</div>)
    }

    return (
        <Aux>
            {phasesBar}
        </Aux>
        
    );
}

export default progressBar
