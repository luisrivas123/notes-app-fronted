import React, { useEffect, useState } from 'react'
// import {create, getAll} from './services/notes'
import './styles.css'

import Note from './Note'
import { getAllNotes } from './services/notes/getAllNotes'
import { createNote } from './services/notes/createNote'
import { update } from './services/notes/upDateNote'

const FormNote = ({ newNoteTitle, newNoteContent, handleChange, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <input name='title' type='text' onChange={handleChange} value={newNoteTitle} />
      <input name='content' type='text' onChange={handleChange} value={newNoteContent} />
      <button>Crear nota</button>
    </form>
  )
}

const App = (props) => {
  const [notes, setNotes] = useState([])
  const [newNoteTitle, setNewNoteTitle] = useState('')
  const [newNoteContent, setNewNoteContent] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // console.log('useEffect');
    setLoading(true)
    getAllNotes().then(notes => {
      setNotes(notes)
      setLoading(false)
    })
    // Se tiene que ejecutar cuando no cambie nada
    // No tiene ninguna dependencia
  }, [])

  const handleChange = (event) => {
    if (event.target.name === 'title') {
      setNewNoteTitle(event.target.value)
    }
    if (event.target.name === 'content') {
      setNewNoteContent(event.target.value)
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    console.log('crear nota')

    const noteToAddToState = {
      title: newNoteTitle,
      body: newNoteContent,
      userId: 1,
      important: false
    }

    createNote(noteToAddToState).then(newNote => {
      // setNotes([...notes, noteToAddToState])
      // setNotes(notes.concat(noteToAddToState))
      setNotes((prevNotes) => prevNotes.concat(newNote))
    }).catch(e => {
      console.error(e)
    })

    setNewNoteTitle('')
    setNewNoteContent('')
  }

  const handleShowAll = () => {
    setShowAll(() => !showAll)
  }

  const toggleImportanceOf = (id) => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
  }

  if (typeof notes === 'undefined' || notes.length === 0) {
    return (
      <div>
        <h1>Notes</h1>
        {
                loading ? 'Cargando...' : ''
                }
        <p>"No tenemos notas que mostrar"</p>
        <FormNote newNoteTitle={newNoteTitle} newNoteBody={newNoteContent} handleChange={handleChange} handleSubmit={handleSubmit} />
      </div>
    )
  }

  return (
    <div>
      <h1>Notes</h1>
      <button onClick={handleShowAll}>{showAll
        ? 'Show only important'
        : 'Show All'}
      </button>
      <ol>
        {/* Transforma cada elemento del array */}
        {/* se pasa una función que se ejecuta con cafa elemento */}
        {notes
          .filter(note => {
            if (showAll === true) return true
            // si showAll es false retona solo las notas que son importantes
            return note.important === true
          })
          .map(note => (
            <Note
              key={note.id}
              {...note}
              toggleImportance={() => toggleImportanceOf(note.id)}
            />
          ))}
        {/* // <Note key={note.id} content={note.content} date={note.date} />)) */}
      </ol>
      <FormNote newNoteTitle={newNoteTitle} newNoteBody={newNoteContent} handleChange={handleChange} handleSubmit={handleSubmit} />
    </div>

  )
}

export default App
