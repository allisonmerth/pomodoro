import React, {Component} from 'react'
import Aux from '../hoc/Aux/Aux'
import TimeTracker from '../components/TimeTracker/TimeTracker'

// TODO:
// warnings when trying to input invalid values
    // tasksPerCycle cannot be less than 2
// string together all range bars into one bar
// CSS etc
// Add pause/stop/restart button
// prop type validation

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

    startTimerHandler = () => {        
        let phasesTimeline = this.generatePhases()
        
        this.setState({phasesTimeline: phasesTimeline, currentPhaseIndex: 0})
    }

    render() {
        return (       
            <Aux>
                {/* <SettingsBar updateSetting={this.updateSettingHandler} value={this.state.taskTime}/> */}

                <label>
                    Task Time
                    <input onChange={(e) => this.updateTimeSettingHandler("task", e)} type="range" min="0" max="60" value={this.state.phaseTime["task"]} step="1" />
                </label>
                
                <label>
                    Short break time
                    <input onChange={(e) => this.updateTimeSettingHandler("shortBreak", e)} type="range" min="0" max="60" value={this.state.phaseTime["shortBreak"]} step="1" />
                </label>

                <label>
                    Long break time
                    <input onChange={(e) => this.updateTimeSettingHandler("longBreak", e)} type="range" min="0" max="60" value={this.state.phaseTime["longBreak"]} step="1" />
                </label>


                {/* <input onChange={props.updateSetting} type="range" min="0" max="60" value={props.value} step="1" id="myRange" />
                <input onChange={props.updateSetting} type="range" min="0" max="60" value={props.value} step="1" id="myRange" /> */}
            

                <button onClick={this.startTimerHandler}>Start</button>
                <TimeTracker phasesTimeline={this.state.phasesTimeline} currentPhaseIndex={this.state.currentPhaseIndex} onComplete={this.updatePhaseHandler} countdownTimeInMinutes={this.getCountdownTime()} />
            </Aux>            
        );
    }
}

export default Pomodoro;