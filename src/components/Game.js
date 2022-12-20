function Game(props) {
  return (
    <div className="Game">
      {props.isGameStarted ? <p>Score: {props.score}</p> : <div><button onClick={props.handleStartClick}>Start Game</button></div>}
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
          <p>Is {props.skaters[props.currSkaterIndex].skater}</p> :
          <p>Is _____ ________</p>
      }
      < button
        disabled={!props.isGameStarted || props.isGameFinished}
        onClick={props.handleAnswerClick}>
        GOOFY
      </button> or
      < button
        disabled={!props.isGameStarted || props.isGameFinished
        }
        onClick={props.handleAnswerClick} >
        REGULAR
      </button > ?
    </div>
  )
}

export default Game;