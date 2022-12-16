import GameOverPrompt from './components/GameOverPrompt';
import './App.css';
import skaters from './data/skaters.json';
import { useState } from 'react';

function App() {
  const [currSkaterIndex, setCurrSkaterIndex] = useState(13);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false)

  function handleAnswerClick(e) {
    e.preventDefault();
    console.log(e.target.textContent.toLowerCase());
    e.target.textContent.toLowerCase() === skaters[currSkaterIndex].stance ?
      CorrectGuess() :
      IncorrectGuess()
  }

  function handleResetClick(e) {
    setScore(0);
    newSkater();
    setIsGameOver(false);
  }

  function CorrectGuess() {
    setScore(score + 1);
    newSkater();
  }

  function IncorrectGuess() {
    setIsGameOver(true)
  }

  function newSkater() {
    setCurrSkaterIndex(Math.floor(Math.random() * skaters.length));
  }

  return (
    <div className="App">
      <h1>Guess the Stance</h1>
      <img
        src={require(`./images/${skaters[currSkaterIndex].image}`)}
        style={{ height: 200, width: 200 }}
      />
      <p>Is {skaters[currSkaterIndex].skater}</p>
      <button
        disabled={isGameOver}
        onClick={handleAnswerClick}>
        GOOFY
      </button> or
      <button
        disabled={isGameOver}
        onClick={handleAnswerClick}>
        REGULAR
      </button> ?
      <p>Score: {score}</p>
      {isGameOver ?
        <GameOverPrompt score={score} handleResetClick={handleResetClick} /> :
        null
      }

    </div>
  );
}

export default App;
