import React from 'react'
import Aux from '../../hoc/Aux/Aux'

const settingsBar = (props) => {
    return (
        <Aux>
            <input onChange={props.updateSetting} type="range" min="0" max="60" value={props.value} step="1" id="myRange" />
            <input onChange={props.updateSetting} type="range" min="0" max="60" value={props.value} step="1" id="myRange" />
            <input onChange={props.updateSetting} type="range" min="0" max="60" value={props.value} step="1" id="myRange" />
            
        </Aux>     
        //     <section class="range-slider">
        //     <span class="rangeValues"></span>
        //     <input value="5" min="0" max="15" step="0.5" type="range" />
        //     <input value="10" min="0" max="15" step="0.5" type="range" />
        // </section>


            // {/* <input type="text" value={props.value} onChange={props.handleChange} />
            // <input type="text" value={props.value} onChange={props.handleChange} />
            // <input type="text" value={props.value} onChange={props.handleChange} /> */}
               
    )
}

export default settingsBar;