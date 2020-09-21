import React, {Component} from 'react'
import Aux from '../hoc/Aux/Aux'
import TimeTracker from '../components/TimeTracker/TimeTracker'
import SettingsBar from '../components/SettingsBar/SettingsBar'
import './Pomodoro.css'

// TODO:
// warnings when trying to input invalid values
    // short break cannot be longer than long break OR task
// string together all range bars into one bar
// Add pause button
// prop type validation
// css adjust for window size (e.g. don't show progressBar if window is too small)
// make phase timeline a circle rather than bar

class Pomodoro extends Component {

    state = {
        tasksPerCycle: 4,
        numCycles: 1,
        phaseTime: {
            task: 25,
            shortBreak: 5,
            longBreak: 15
        },
        phasesTimeline: null,
        currentPhaseIndex: null,
        cyclesRemaining: null
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
            
            if (this.state.cyclesRemaining > 0) {                
                this.setState({
                    cyclesRemaining: this.state.cyclesRemaining - 1,
                    currentPhaseIndex: 0})
            } else {
                alert("Completed pomodoro!")
                this.setState({currentPhaseIndex: null})
            }           
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
        
        this.setState({
            phasesTimeline: phasesTimeline, 
            currentPhaseIndex: 0,
            cyclesRemaining: this.state.numCycles - 1})
    }

    stopTimerHandler = () => {                
        this.setState({currentPhaseIndex: null})
    }

    render() {
        let button = <button onClick={this.startTimerHandler}>Start</button>

        if (this.state.currentPhaseIndex != null) {
            button = <button onClick={this.stopTimerHandler}>Stop</button>
        }

        let settings = (
            <Aux>
                <SettingsBar 
                    settingsList={["task", "shortBreak", "longBreak"]} 
                    updateTimeSettingHandler={this.updateTimeSettingHandler} 
                    getSettingValueHandler={this.getSettingValueHandler} />
                
                <div style={{margin: "20px"}}>
                    Tasks per cycle
                    <input type="number" value={this.state.tasksPerCycle} onChange={(e) => {if (e.target.value > 1) {this.setState({tasksPerCycle: e.target.value})}}}/>

                    Number of pomodoro cycles
                    <input type="number" value={this.state.numCycles} onChange={(e) => {if (e.target.value > 0) {this.setState({numCycles: e.target.value})}}}/>
                </div>
            </Aux>
            )

        if (this.state.currentPhaseIndex != null) {
            settings = null
        }
        
        return (       
            <Aux>
                <h1>Pomodoro!</h1>
                {button}

                {settings}

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