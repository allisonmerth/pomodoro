import React, {Component} from 'react'
import SettingsBar from '../components/SettingsBar/SettingsBar'
import Aux from '../hoc/Aux/Aux'
import ProgressBar from '../components/ProgressBar/ProgressBar'
import Countdown from 'react-countdown';

// TODO:
// prevent small break time from being longer than task time
// prevent long break time from being shorter than short break time
// string together all range bars into one bar
// figure out better way to determine phase ordering
// enum for phases?
// CSS etc


class Pomodoro extends Component {
    state = {
        showSettings: true,
        showProgressBar: false,
        taskTime: 25,
        smallBreakTime: 5,
        longBreakTime: 15,
        tasksPerCycle: 4,
        numCycles: 1,
        currentPhase: null,
        currentCycle: null,
    }

    getCountdownTime() {
        var currentPhase = this.state.currentPhase
        switch(currentPhase) {
            case 'task':
                return this.state.taskTime      
            case 'shortBreak':
                return this.state.smallBreakTime
            case 'longBreak':
                return this.state.longBreakTime
        }
    }

    updatePhase() {
        // if (!currentCycle) {
        //     this.setState({currentCycle: 0})
        // }

        var currentPhase = this.state.currentPhase
        if (!currentPhase) {
            this.setState({currentPhase: "task"})
            
        } else {
            switch(currentPhase) {
                case 'task':
                    var tasksLeft = this.state.tasksLeft - 1
                    this.setState({tasksLeft: tasksLeft})
                    if (tasksLeft > 0) {
                        this.setState({currentPhase: "shortBreak"});
                    } else {
                        this.setState({currentPhase: "longBreak"});
                    }
                    break     
                case 'shortBreak':
                    this.setState({currentPhase: "task"});
                    break
                case 'longBreak':
                    this.setState({currentPhase: null})
                    alert('Pomodoro cycle completed!')
                    break
            }
        }  
    }

    timeRanOutHandler = () => {
        this.updatePhase(this.state.currentPhase)
    }

    updateTaskTimeSettingHandler = (event) => {
        this.setState({taskTime: event.target.value})
    }
    updateSmallBreakTimeSettingHandler = (event) => {
        this.setState({smallBreakTime: event.target.value})
    }
    updateLongBreakTimeSettingHandler = (event) => {
        this.setState({longBreakTime: event.target.value})
    }

    startTimerHandler = () => {
        this.state.tasksLeft = this.state.tasksPerCycle
        this.updatePhase()
    }

    render() {
        let countdown = this.state.currentPhase ? <Countdown key={Date.now()} onComplete={this.timeRanOutHandler}  date={Date.now() + (this.getCountdownTime()*60000)} /> : null

        return (
            
            <Aux>
                {/* <SettingsBar updateSetting={this.updateSettingHandler} value={this.state.taskTime}/> */}

                <label>
                    Task Time
                    <input onChange={this.updateTaskTimeSettingHandler} type="range" min="0" max="60" value={this.state.taskTime} step="1" id="myRange" />
                </label>
                
                <label>
                    Short break time
                    <input onChange={this.updateSmallBreakTimeSettingHandler} type="range" min="0" max="60" value={this.state.smallBreakTime} step="1" id="myRange" />
                </label>

                <label>
                    Long break time
                    <input onChange={this.updateLongBreakTimeSettingHandler} type="range" min="0" max="60" value={this.state.longBreakTime} step="1" id="myRange" />
                </label>

                {/* <input onChange={props.updateSetting} type="range" min="0" max="60" value={props.value} step="1" id="myRange" />
                <input onChange={props.updateSetting} type="range" min="0" max="60" value={props.value} step="1" id="myRange" /> */}
            

                <button onClick={this.startTimerHandler}>Start</button>
                <ProgressBar />
                {countdown}
            </Aux>            
        );
    }
}

export default Pomodoro;