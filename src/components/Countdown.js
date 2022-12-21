function Countdown(props) {
  if (props.isGameStarted && !props.isGameFinished) {
    return <div>TIME LEFT: {props.countdownSeconds}</div>
  }
}

export default Countdown;