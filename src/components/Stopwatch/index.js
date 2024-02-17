import {Component} from 'react'
import './index.css'

class Stopwatch extends Component {
  state = {
    isTimerRunning: false,
    timeElapsedInSeconds: 0,
  }

  componentWillUnmount() {
    clearInterval(this.stopwatchId)
    this.setState({isTimerRunning: false})
  }

  onStart = () => {
    this.stopwatchId = setInterval(this.tick, 1000)
    this.setState({isTimerRunning: true})
  }

  onStop = () => {
    clearInterval(this.stopwatchId)
    this.setState({isTimerRunning: false})
  }

  onReset = () => {
    clearInterval(this.stopwatchId)
    this.setState({isTimerRunning: false, timeElapsedInSeconds: 0})
  }

  tick = () => {
    this.setState(prevState => ({
      timeElapsedInSeconds: prevState.timeElapsedInSeconds + 1,
    }))
  }

  getTime = () => {
    const {timeElapsedInSeconds} = this.state

    const minutes = Math.floor(timeElapsedInSeconds / 60)
    const seconds = timeElapsedInSeconds % 60

    const minutesText = minutes > 9 ? `${minutes}` : `0${minutes}`
    const secondsText = seconds > 9 ? `${seconds}` : `0${seconds}`

    return `${minutesText}:${secondsText}`
  }

  render() {
    const {isTimerRunning} = this.state

    return (
      <div className="bg-container">
        <h1 className="heading">Stopwatch</h1>
        <div className="stopwatch-container">
          <div className="timer-heading-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/stopwatch-timer.png"
              alt="stopwatch"
              className="timer-image"
            />
            <p className="timer-text">Timer</p>
          </div>
          <h1 className="timer">{this.getTime()}</h1>
          <div className="buttons-container">
            <button
              type="button"
              className="button start-button"
              disabled={isTimerRunning}
              onClick={this.onStart}
            >
              Start
            </button>
            <button
              type="button"
              className="button stop-button"
              onClick={this.onStop}
            >
              Stop
            </button>
            <button
              type="button"
              className="button reset-button"
              onClick={this.onReset}
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default Stopwatch
