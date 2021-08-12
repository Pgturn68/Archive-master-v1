import React, { useEffect, useState } from 'react'
import { Container } from '@material-ui/core'
import NoteCard from '../components/NoteCard'
import Masonry from 'react-masonry-css'
import TripCard from '../components/TripCard'
import { getTrips } from '../utils/api'
export default function Notes() {
  const [cards, setCards] = useState([])

  useEffect(() => {
    getTrips(localStorage.getItem('userId'))
    .then((results) => {
      console.log('Results: ', results.data)
      const newCards = results.data.map((item) => { 
        return {
          title: item.title,
          category: item.category,
          details: item.details,
          images: item.images,
        }
      })

      console.log('newCards: ', newCards)
      setCards(newCards)

      })
  }, [])

  const handleDelete = async (id) => {
    await fetch('http://localhost:8000/notes/' + id, {
      method: 'DELETE'
    })

  }
  // Responsive Breakpoints
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
        {cards && cards.map((item) => { 
          return (<TripCard
            firstLetter={item.category.charAt(0)}
            title={item.title}
            details={item.details}
            category={item.category}
            image={item.images[0]}
          />)
        })}
        
        {/* {notes.map(note => (
          <div key={note.id} xs={12} md={6} lg={4}>
            <NoteCard note={note} handleDelete={handleDelete}/>
          </div>
        ))} */}
      </Masonry>
    </Container>
  )
}