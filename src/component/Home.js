import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext'

const Home = () => {
  const b = useContext(noteContext);
  return (
    <div>
      This is {b.single} home
    </div>
  )
}

export default Home
