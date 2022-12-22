import LeaderBoardLine from "./LeaderBoardLine";

function LeaderBoard(props) {
  return (
    <div className='LeaderBoard'>
      <h2>Leaderboard</h2>
      {props.leaderboardScores
        .sort(({ score: previousScore }, { score: currentScore }) => currentScore - previousScore)
        .map((scoreLine) =>
          <LeaderBoardLine
            key={scoreLine.uuid}
            score={scoreLine.score}
            name={scoreLine.name}
          />)}
    </div>
  )
}

export default LeaderBoard;