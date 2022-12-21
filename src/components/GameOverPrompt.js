function GameOverPrompt(props) {
  return (
    <div className='GameOverPrompt'>
      {props.isGameFinished && <div className='GameOverPrompt-Popup'>
        <p>GAME OVER</p>
        <p>You Scored: {props.score}</p>
        <button onClick={props.handleResetClick}>Play Again?</button>
        {props.isScoreSubmitted ?
          <div>
            <p>Thanks for submitting your score!</p>
            <p>Check out the leaderboard to see how you stack up</p>
          </div> :
          <div>
            <p>Want to submit your score to the leaderboard?</p>
            <input type='text' placeholder='Name' value={props.name} onChange={props.handleNameChange}></input>
            <button onClick={props.handleScoreSubmit}>Submit Score</button>
          </div>}

      </div>}
    </div>
  )
}

export default GameOverPrompt;