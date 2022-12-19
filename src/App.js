import GameOverPrompt from './components/GameOverPrompt';
import skaters from './data/skaters.json';
import { useState, useEffect } from 'react';
import { db } from './firebase-config';
import { set, ref } from 'firebase/database';
import { uid } from 'uid';
import './App.css';

function App() {
  const [currSkaterIndex, setCurrSkaterIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isGameFinished, setIsGameFinished] = useState(false);
  const [usedIndexes, setUsedIndexes] = useState([]);
  const [countdownSeconds, setCountdownSeconds] = useState(5);
  const [name, setName] = useState("");

  // Firebase Write/Create
  const writeDatabase = () => {
    const uuid = uid()
    set(ref(db, `/${uuid}`), {
      name: name,
      score: score,
      uuid: uuid
    });

    setName("");
  }

  useEffect(() => {
    countdownSeconds > 0 && setInterval(() => {
      setCountdownSeconds((time) => time - .5);
    }, 1000);
  }, []);

  useEffect(() => {
    if (countdownSeconds === 0 && isGameStarted) {
      endGame();
    }
  }, [countdownSeconds])

  const handleNameChange = (e) => {
    setName(e.target.value)
    console.log('name is ', name)
  }

  function handleStartClick(e) {
    e.preventDefault();
    setIsGameStarted(true);
    newSkater();
  }

  function handleAnswerClick(e) {
    e.preventDefault();
    e.target.textContent.toLowerCase() === skaters[currSkaterIndex].stance ?
      correctGuess() :
      endGame()
  }

  function handleResetClick(e) {
    setScore(0);
    newSkater();
    setIsGameFinished(false);
  }

  function correctGuess() {
    setScore(score + 1);
    newSkater();
  }

  function endGame() {
    setUsedIndexes([]);
    setIsGameFinished(true);
  }

  function newSkater() {
    let newIndex = Math.floor(Math.random() * skaters.length);
    // while loop ensures skater index hasn't already been used (avoids duplicates)
    while (usedIndexes.includes(newIndex)) {
      newIndex = Math.floor(Math.random() * skaters.length)
      console.log('trying new value ', newIndex)
    }
    setUsedIndexes(current => [...current, newIndex]);
    setCurrSkaterIndex(newIndex);
    setCountdownSeconds(5);
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
          <GameOverPrompt
            score={score}
            handleResetClick={handleResetClick}
            name={name}
            handleNameChange={handleNameChange}
            writeDatabase={writeDatabase}
          /> :
          null
      }
      {isGameStarted && !isGameFinished ?
        <p>Countdown: {countdownSeconds}</p> :
        null
      }
    </div >
  );
}

export default App;
