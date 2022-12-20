import LeaderBoardLine from "./LeaderBoardLine";

function LeaderBoard(props) {
  return (
    <div className='LeaderBoard'>
      <h2>Leaderboard</h2>
      {props.leaderboardScores.map((scoreLine) =>
        <LeaderBoardLine
          key={scoreLine.uuid}
          name={scoreLine.name}
          score={scoreLine.score}
        />)}
    </div>
  )
}

export default LeaderBoard;