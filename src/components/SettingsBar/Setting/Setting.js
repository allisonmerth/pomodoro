import React from 'react'
import phaseFullNameMap from '../../../constants/PhaseFullNameMap'
import './Setting.css'

const setting = (props) => (
    <label>
        {phaseFullNameMap[props.phase] + "  Time"}
        <input onChange={(e) => props.updateTimeSettingHandler(props.phase, e)} type="range" min="1" max="60" value={props.value} step="1" />
    </label>
)

export default setting;