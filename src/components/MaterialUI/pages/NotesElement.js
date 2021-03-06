import { useEffect, useState } from 'react'
import Container from '@material-ui/core/Container'
import Masonry from 'react-masonry-css'
import NoteCard from './NoteCard'

export default function NotesElement() {
  const [notes, setNotes] = useState([])
  //
  //  Load notes
  //
  useEffect(() => {
    fetch('http://localhost:8001/notes')
      .then(res => res.json())
      .then(data => setNotes(data))
  }, [])
  //
  //  Delete Note
  //
  const handleDelete = async id => {
    await fetch('http://localhost:8001/notes/' + id, {
      method: 'DELETE'
    })
    const newNotes = notes.filter(note => note.id !== id)
    setNotes(newNotes)
  }

  const breakpoints = {
    default: 3,
    1100: 2,
    700: 1
  }

  return (
    <Container>
      <Masonry
        breakpointCols={breakpoints}
        className='my-masonry-grid'
        columnClassName='my-masonry-grid_column'
      >
        {notes.map(note => (
          <div key={note.id}>
            <NoteCard note={note} handleDelete={handleDelete} />
          </div>
        ))}
      </Masonry>
    </Container>
  )
}
