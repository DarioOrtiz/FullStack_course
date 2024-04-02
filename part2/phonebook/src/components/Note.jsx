const Note = ({ note, toggleImportance }) => {
  const label = note.important
    ? 'make not important' : 'make important'

  return (
    <li>
      {note.content} 
      <button onClick={toggleImportance}>{label}</button>
    </li>
  )
}
addNote = event => {
  event.preventDefault()
  const noteObject = {
    content: newNote,
    important: Math.random() > 0.5,
  }

  axios
  .post('http://localhost:3001/notes', noteObject)
  .then(response => {
    setNotes(notes.concat(response.data))
    setNewNote('')
  })
}
export default Note