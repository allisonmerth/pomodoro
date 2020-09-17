import React from 'react'
import phaseFullNameMap from '../../../constants/PhaseFullNameMap'
import './Setting.css'
import Aux from './../../../hoc/Aux/Aux'

const setting = (props) => (
    <Aux>
        <label>
            {phaseFullNameMap[props.phase] + "  Time: " + props.value + " minutes"}            
            <input onChange={(e) => props.updateTimeSettingHandler(props.phase, e)} type="range" min="1" max="60" value={props.value} step="1" />
        </label>
    </Aux>

    
)

export default setting;