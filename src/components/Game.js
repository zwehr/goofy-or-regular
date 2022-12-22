function Game(props) {
  return (
    <div className="Game">
      {props.isGameStarted ? <p>Score: {props.score}</p> : <div><button className="Game-Start btn" onClick={props.handleStartClick}>Start Game</button></div>}
      {
        props.isGameStarted ?
          <img
            src={require(`../images/${props.skaters[props.currSkaterIndex].image}`)}
            className='headshot'
            alt='skater headshot'
          /> :
          <img
            src={require('../images/question-mark-face.jpeg')}
            className='headshot'
            alt='question mark over face graphic'
          />
      }
      {
        props.isGameStarted ?
          <div>
            <p>Is {props.skaters[props.currSkaterIndex].skater}</p>
            <p>Answer: {props.skaters[props.currSkaterIndex].stance}</p>
          </div> :
          <p>Is ___________</p>
      }
      < button
        className='btn'
        disabled={!props.isGameStarted || props.isGameFinished}
        onClick={props.handleAnswerClick}>
        GOOFY
      </button>or
      < button
        className='btn'
        disabled={!props.isGameStarted || props.isGameFinished
        }
        onClick={props.handleAnswerClick} >
        REGULAR
      </button > ?
    </div>
  )
}

export default Game;