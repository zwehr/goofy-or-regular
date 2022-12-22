import { FaMedal } from "react-icons/fa";

function LeaderBoardLine(props) {
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

export default LeaderBoardLine;