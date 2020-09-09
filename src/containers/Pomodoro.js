import React, {Component} from 'react'
import Aux from '../hoc/Aux/Aux'
import TimeTracker from '../components/TimeTracker/TimeTracker'
import SettingsBar from '../components/SettingsBar/SettingsBar'
import classes from './Pomodoro.module.css'

// TODO:
// warnings when trying to input invalid values
    // tasksPerCycle cannot be less than 2
    // short break cannot be longer than long break OR task
// string together all range bars into one bar
// CSS etc
// Add pause/stop/restart button
// prop type validation
// css adjust for window size (don't show progressBar if window is too small)

class Pomodoro extends Component {

    state = {
        tasksPerCycle: 4,
        numCycles: 1,
        currentPhase: null,
        currentCycle: null,
        phaseTime: {
            task: 25,
            shortBreak: 5,
            longBreak: 15
        },
        phasesTimeline: null,
        currentPhaseIndex: null
    }   

    generatePhases() {
        let phasesTimeline = ["task"]

        for (var i = 0; i < this.state.tasksPerCycle - 1; i++) {            
            phasesTimeline.push("shortBreak")
            phasesTimeline.push("task")
        }
        phasesTimeline.push("longBreak")
        
        return phasesTimeline
    }

    getCountdownTime() {
        var currentPhase = this.getCurrentPhase()
        if (!currentPhase) {
            return null
        }
        return this.state.phaseTime[currentPhase]
    }

    getCurrentPhase() {
        if (!this.state.phasesTimeline || this.state.currentPhaseIndex == null) {
            return null
        }
        return this.state.phasesTimeline[this.state.currentPhaseIndex]
    }

    updatePhaseHandler = () => {
        let currentPhaseIndex = this.state.currentPhaseIndex

        if (currentPhaseIndex == null) {
            this.setState({currentPhaseIndex: 0})
        } else if (currentPhaseIndex >= this.state.phasesTimeline.length - 1) {
            alert("Completed pomodoro cycle!")
            this.setState({currentPhaseIndex: null})
        } else {
            let updatedPhaseIndex = currentPhaseIndex + 1
            this.setState({currentPhaseIndex: updatedPhaseIndex})
        }
    }

    updateTimeSettingHandler = (phase, event) => {
        const updatedTime = {
            ...this.state.phaseTime
        }
        updatedTime[phase] = event.target.value;

        this.setState({phaseTime: updatedTime})
    }

    getSettingValueHandler = (phase) => {
        return this.state.phaseTime[phase]
    }

    startTimerHandler = () => {        
        let phasesTimeline = this.generatePhases()
        
        this.setState({phasesTimeline: phasesTimeline, currentPhaseIndex: 0})
    }

    stopTimerHandler = () => {                
        this.setState({currentPhaseIndex: null})
    }

    pauseTimerHandler = () => {

    }

    render() {
        let button = <button onClick={this.startTimerHandler}>Start</button>

        if (this.state.currentPhaseIndex != null) {
            button = <button onClick={this.stopTimerHandler}>Stop</button>
        }
        
        return (       
            <Aux>
                <SettingsBar 
                    settingsList={["task", "shortBreak", "longBreak"]} 
                    updateTimeSettingHandler={this.updateTimeSettingHandler} 
                    getSettingValueHandler={this.getSettingValueHandler} />

                {/* <label>
                    Task Time
                    <input className={classes.Setting} onChange={(e) => this.updateTimeSettingHandler("task", e)} type="range" min="0" max="60" value={this.state.phaseTime["task"]} step="1" />
                </label>
                
                <label>
                    Short break time
                    <input className={classes.Setting} onChange={(e) => this.updateTimeSettingHandler("shortBreak", e)} type="range" min="0" max="60" value={this.state.phaseTime["shortBreak"]} step="1" />
                </label>

                <label>
                    Long break time
                    <input className={classes.Setting} onChange={(e) => this.updateTimeSettingHandler("longBreak", e)} type="range" min="0" max="60" value={this.state.phaseTime["longBreak"]} step="1" />
                </label> */}

                {button}
                <TimeTracker 
                    phasesTimeline={this.state.phasesTimeline} 
                    currentPhaseIndex={this.state.currentPhaseIndex} 
                    onComplete={this.updatePhaseHandler} 
                    countdownTimeInMinutes={this.getCountdownTime()} />
            </Aux>            
        );
    }
}

export default Pomodoro;