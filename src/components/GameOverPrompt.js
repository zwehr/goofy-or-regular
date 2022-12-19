function GameOverPrompt(props) {
  return (
    <div className="GameOverPrompt">
      <p>GAME OVER</p>
      <p>You Scored: {props.score}</p>
      <button onClick={props.handleResetClick}>Play Again?</button>
      <div>
        <p>Want to submit your score to the leaderboard?</p>
        <input type='text' value={props.name} onChange={props.handleNameChange}></input>
        <button onClick={props.writeDatabase}>Submit Score</button>
      </div>
    </div>
  )
}

export default GameOverPrompt;