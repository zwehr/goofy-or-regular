import Game from './components/Game';
import Countdown from './components/Countdown';
import GameOverPrompt from './components/GameOverPrompt';
import Leaderboard from './components/Leaderboard';
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
  const [remainingIndexes, setRemainingIndexes] = useState([...Array(skaters.length).keys()]);
  const [countdownSeconds, setCountdownSeconds] = useState(10);
  const [name, setName] = useState("");
  const [leaderboardScores, setLeaderboardScores] = useState([]);
  const [isScoreSubmitted, setIsScoreSubmitted] = useState(false);
  const [isEverythingAnswered, setIsEverythingAnswered] = useState(false);

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

  const handleScoreSubmit = () => {
    writeDatabase();
    setIsScoreSubmitted(true);
  }

  useEffect(() => {
    countdownSeconds > 0 && setInterval(() => {
      setCountdownSeconds((time) => time - 1);
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (countdownSeconds === 0 && isGameStarted) {
      endGame();
    }
  }, [countdownSeconds, isGameStarted])

  const handleNameChange = (e) => {
    setName(e.target.value)
  }

  const handleStartClick = (e) => {
    e.preventDefault();
    setIsGameStarted(true);
    newSkater();
    setIsScoreSubmitted(false);
  }

  const handleAnswerClick = (e) => {
    e.preventDefault();
    e.target.textContent.toLowerCase() === skaters[currSkaterIndex].stance ?
      correctGuess() :
      endGame()
  }

  const handleResetClick = (e) => {
    setScore(0);
    newSkater();
    setIsGameFinished(false);
    setIsScoreSubmitted(false);
  }

  const correctGuess = () => {
    setScore(score + 1);
    newSkater();
  }

  const endGame = () => {
    setRemainingIndexes([...Array(skaters.length).keys()]);
    setIsGameFinished(true);
  }

  const newSkater = () => {
    if (remainingIndexes.length === 0) {
      setIsEverythingAnswered(true);
      endGame();
    } else {
      const newIndex = Math.floor(Math.random() * remainingIndexes.length);
      const newValue = remainingIndexes[newIndex]
      setCurrSkaterIndex(newValue);
      setRemainingIndexes((indexArr) =>
        indexArr.filter(index => index !== newValue)
      )
      setCountdownSeconds(10);
    }
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
      <GameOverPrompt
        score={score}
        handleResetClick={handleResetClick}
        name={name}
        handleNameChange={handleNameChange}
        isGameFinished={isGameFinished}
        handleScoreSubmit={handleScoreSubmit}
        isScoreSubmitted={isScoreSubmitted}
        isEverythingAnswered={isEverythingAnswered}
      />
      <Countdown
        countdownSeconds={countdownSeconds}
        isGameStarted={isGameStarted}
        isGameFinished={isGameFinished}
      />
      <Leaderboard
        leaderboardScores={leaderboardScores}
      />
    </div >
  );
}

export default App;
