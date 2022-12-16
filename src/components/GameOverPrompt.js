function GameOverPrompt(props) {
  return (
    <div className="GameOverPrompt">
      <p>GAME OVER</p>
      <p>You Scored: {props.score}</p>
      <button onClick={props.handleResetClick}>Play Again?</button>
    </div>
  )
}

export default GameOverPrompt;