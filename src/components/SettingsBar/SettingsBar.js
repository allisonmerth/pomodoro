import React from 'react'
import Aux from '../../hoc/Aux/Aux'
import Setting from './Setting/Setting'

const settingsBar = (props) => {
    let settings = []

    if (props.settingsList) {
        props.settingsList.map(setting => {
            settings.push(
                <Setting key={setting} phase={setting} updateTimeSettingHandler={props.updateTimeSettingHandler} value={props.getSettingValueHandler(setting)}/>
            )
        })
    }
    
    return (
        <Aux>
            {settings}
        </Aux> 
    )
}

export default settingsBar;