import Game from './components/Game';
import GameOverPrompt from './components/GameOverPrompt';
import LeaderBoard from './components/LeaderBoard';
import skaters from './data/skaters.json';
import { useState, useEffect } from 'react';
import { db } from './firebase-config';
import { set, ref, onValue } from 'firebase/database';
import { uid } from 'uid';
import './App.css';

function App() {
  const [currSkaterIndex, setCurrSkaterIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isGameFinished, setIsGameFinished] = useState(false);
  const [usedIndexes, setUsedIndexes] = useState([]);
  const [countdownSeconds, setCountdownSeconds] = useState(10);
  const [name, setName] = useState("");
  const [leaderboardScores, setLeaderboardScores] = useState([]);

  // Firebase Read
  useEffect(() => {
    onValue(ref(db), snapshot => {
      const data = snapshot.val();
      const dataAsArray = Object.values(data);
      setLeaderboardScores(dataAsArray);
    })
  }, [])

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
      setCountdownSeconds((time) => time - 1);
    }, 1000);
  });

  useEffect(() => {
    if (countdownSeconds === 0 && isGameStarted) {
      endGame();
    }
  }, [countdownSeconds, isGameStarted])

  const handleNameChange = (e) => {
    setName(e.target.value)
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
    // While loop ensures skater index hasn't already been used (avoids duplicates)
    while (usedIndexes.includes(newIndex)) {
      newIndex = Math.floor(Math.random() * skaters.length)
      console.log('trying new value ', newIndex)
    }
    setUsedIndexes((current) => [...current, newIndex]);
    setCurrSkaterIndex(newIndex);
    setCountdownSeconds(10);
  }

  return (
    <div className="App">
      <h1>Guess the Stance</h1>
      <Game
        skaters={skaters}
        currSkaterIndex={currSkaterIndex}
        score={score}
        isGameStarted={isGameStarted}
        handleStartClick={handleStartClick}
        handleAnswerClick={handleAnswerClick}
        isGameFinished={isGameFinished}
      />
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
      {
        isGameStarted && !isGameFinished ?
          <p>TIME LEFT: {countdownSeconds}</p> :
          null
      }
      <div>
        <LeaderBoard leaderboardScores={leaderboardScores} />
      </div>
    </div >
  );
}

export default App;
