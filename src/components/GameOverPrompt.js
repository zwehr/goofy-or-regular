function GameOverPrompt(props) {
  const endGameMessage = props.isEverythingAnswered ? 'YOU GOT \'EM ALL' : 'GAME OVER'

  return (
    <div className='GameOverPrompt'>
      {props.isGameFinished && <div className='GameOverPrompt-Popup'>
        <p>{endGameMessage}</p>
        <p>You Scored: {props.score}</p>
        <button className='btn' onClick={props.handleResetClick}>Play Again?</button>
        {props.isScoreSubmitted ?
          <div>
            <p>Thanks for submitting your score!</p>
            <p>Check out the leaderboard to see how you stack up</p>
          </div> :
          <div>
            <p>Want to submit your score to the leaderboard?</p>
            <form onSubmit={props.handleScoreSubmit}>
              <input type='text' placeholder='Name' value={props.name} onChange={props.handleNameChange} required />
              <button type='submit' className='btn btn-submit'>Submit Score</button>
            </form>
          </div>}

      </div>}
    </div>
  )
}

export default GameOverPrompt;