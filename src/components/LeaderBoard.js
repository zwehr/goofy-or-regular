import LeaderboardLine from "./LeaderboardLine";
import './Leaderboard.css';

export default function Leaderboard(props) {
  return (
    <div className='Leaderboard'>
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
            .map((scoreLine, index) =>
              <LeaderboardLine
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
