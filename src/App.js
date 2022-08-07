import React from 'react'
import {useEffect, useState} from 'react'
// import {create, getAll} from './services/notes'
import './styles.css';

import Note from './Note';
import { getAllNotes } from './services/notes/getAllNotes';
import { createNote } from './services/notes/createNote';

const FormNote = ({newNoteTitle, newNoteBody, handleChange, handleSubmit}) => {
    return <form onSubmit={handleSubmit}>
                <input name="title" type="text" onChange={handleChange} value={newNoteTitle} ></input>
                <input name="body" type="text" onChange={handleChange} value={newNoteBody} ></input>
                <button>Crear nota</button>
            </form>
}

const App = (props) => {

    const [notes, setNotes] = useState([])
    const [newNoteTitle, setNewNoteTitle] = useState('')
    const [newNoteBody, setNewNoteBody] = useState('')
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

        if (event.target.name === "title"){
            setNewNoteTitle(event.target.value)
        }
        if (event.target.name === "body"){
            setNewNoteBody(event.target.value)
        }
        
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        console.log('crear nota')

        const noteToAddToState = {
            title: newNoteTitle,
            body: newNoteBody,
            userId: 1
        }

        createNote(noteToAddToState).then(newNote => {
                // setNotes([...notes, noteToAddToState])
                // setNotes(notes.concat(noteToAddToState))
                setNotes((prevNotes) => prevNotes.concat(newNote))
            }).catch(e => {
                console.error(e)
            })
        
        setNewNoteTitle('')
        setNewNoteBody('')
    }
    
    if (typeof notes === "undefined" || notes.length === 0){
        return (
            <div>
                <h1>Notes</h1>
                {
                loading ? 'Cargando...' : ''
                }
                <p>"No tenemos notas que mostrar"</p>
                <form onSubmit={handleSubmit}>
                <input type="text" onChange={handleChange} value={newNoteTitle} ></input>
                <button>Crear nota</button>
                </form>
            </div>
        )
    }

    return (
        <div>
            <h1>Notes</h1>
            <ol>
            {/* Transforma cada elemento del array */}
            {/* se pasa una función que se ejecuta con cafa elemento */}
            {notes
                .map(note => (
                    <Note key={note.id} {...note} />))
                    // <Note key={note.id} content={note.content} date={note.date} />))
            }
            </ol>
            <FormNote newNoteTitle={newNoteTitle} newNoteBody={newNoteBody} handleChange={handleChange} handleSubmit={handleSubmit}></FormNote>
            {/* <form onSubmit={handleSubmit}>
                <input name="title" type="text" onChange={handleChange} value={newNoteTitle} ></input>
                <input name="body" type="text" onChange={handleChange} value={newNoteBody} ></input>
                <button>Crear nota</button>
            </form> */}
        </div>
        
    )
}

export default App;