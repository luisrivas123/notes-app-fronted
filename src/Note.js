// const Note = ({ note }) => {
const Note = ({ title, body, important, toggleImportance }) => {
  const label = important
    ? 'make not important'
    : 'make important'

  return (
    <li>
      <p>{title}</p>
      <small>{body}</small>
      <button onClick={toggleImportance}>{label}</button>
    </li>
  )
}

export default Note
