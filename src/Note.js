// const Note = ({ note }) => {
const Note = ({ title, content, important, toggleImportance }) => {
  const label = important
    ? 'make not important'
    : 'make important'

  return (
    <li>
      <p>{title}</p>
      <small>{content}</small>
      <button onClick={toggleImportance}>{label}</button>
    </li>
  )
}

export default Note
