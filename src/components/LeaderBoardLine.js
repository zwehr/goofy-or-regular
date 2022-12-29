import { FaMedal } from "react-icons/fa";

export default function LeaderboardLine(props) {
  return (
    <tr className='LeaderBoard-Row'>
      <td>{props.score}</td>
      <td>
        {props.mapIndex === 0 && <FaMedal />}
        {props.name}
      </td>
    </tr>
  )
}