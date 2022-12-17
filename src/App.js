import GameOverPrompt from './components/GameOverPrompt';
import './App.css';
import skaters from './data/skaters.json';
import { useState, useEffect } from 'react';

function App() {
  const [currSkaterIndex, setCurrSkaterIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isGameFinished, setIsGameFinished] = useState(false);

  function handleStartClick(e) {
    e.preventDefault();
    setIsGameStarted(true);
    newSkater();
  }

  function handleAnswerClick(e) {
    e.preventDefault();
    e.target.textContent.toLowerCase() === skaters[currSkaterIndex].stance ?
      CorrectGuess() :
      IncorrectGuess()
  }

  function handleResetClick(e) {
    setScore(0);
    newSkater();
    setIsGameFinished(false);
  }

  function CorrectGuess() {
    setScore(score + 1);
    newSkater();
  }

  function IncorrectGuess() {
    setIsGameFinished(true)
  }

  function newSkater() {
    setCurrSkaterIndex(Math.floor(Math.random() * skaters.length));
  }

  return (
    <div className="App">
      <h1>Guess the Stance</h1>
      {isGameStarted ? <p>Score: {score}</p> : <div><button onClick={handleStartClick}>Start Game</button></div>}
      {isGameStarted ?
        <img
          src={require(`./images/${skaters[currSkaterIndex].image}`)}
          className='headshot'
        /> :
        <img
          src={require('./images/question-mark-face.jpeg')}
          className='headshot'
        />
      }
      {isGameStarted ?
        <p>Is {skaters[currSkaterIndex].skater}</p> :
        <p>Is _____ ________</p>
      }
      < button
        disabled={!isGameStarted || isGameFinished}
        onClick={handleAnswerClick}>
        GOOFY
      </button> or
      < button
        disabled={!isGameStarted || isGameFinished}
        onClick={handleAnswerClick} >
        REGULAR
      </button > ?
      {
        isGameFinished ?
          <GameOverPrompt score={score} handleResetClick={handleResetClick} /> :
          null
      }

    </div >
  );
}

export default App;
