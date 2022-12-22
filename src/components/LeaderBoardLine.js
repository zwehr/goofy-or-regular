function LeaderBoardLine(props) {
  return (
    <tr className='LeaderBoard-Row'>
      <td>{props.score}</td>
      <td>{props.name}</td>
    </tr>
  )
}

export default LeaderBoardLine;