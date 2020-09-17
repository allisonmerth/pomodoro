import React from 'react'
import Aux from '../../hoc/Aux/Aux'
import Setting from './Setting/Setting'
import classes from './SettingsBar.module.css'

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
        <div className={classes.Settings}>
            <h4>Customize your pomodoro:</h4>
            {settings}
        </div> 
    )
}

export default settingsBar;