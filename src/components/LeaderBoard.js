import LeaderBoardLine from "./LeaderBoardLine";

function LeaderBoard(props) {
  return (
    <div className='LeaderBoard'>
      <h2>Leaderboard</h2>
      <table>
        <thead>
          <tr>
            <th>Score</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {props.leaderboardScores
            .sort(({ score: previousScore }, { score: currentScore }) => currentScore - previousScore)
            .map((scoreLine) =>
              <LeaderBoardLine
                key={scoreLine.uuid}
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