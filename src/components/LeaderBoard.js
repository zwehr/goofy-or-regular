import LeaderBoardLine from "./LeaderBoardLine";

function LeaderBoard(props) {
  return (
    <div className='LeaderBoard'>
      <h2>Leaderboard</h2>
      <table className='LeaderBoard-Table'>
        <thead>
          <tr className='LeaderBoard-Row'>
            <th>Score</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {props.leaderboardScores
            .sort(({ score: previousScore }, { score: currentScore }) => currentScore - previousScore)
            .map((scoreLine, index) =>
              <LeaderBoardLine
                key={scoreLine.uuid}
                mapIndex={index}
                score={scoreLine.score}
                name={scoreLine.name}
              />
            )}
        </tbody>
      </table>
    </div>
  )
}

export default LeaderBoard;