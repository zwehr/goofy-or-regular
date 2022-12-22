function LeaderBoardLine(props) {
  return (
    <tr>
      <td>{props.score}</td>
      <td>{props.name}</td>
    </tr>
  )
}

export default LeaderBoardLine;