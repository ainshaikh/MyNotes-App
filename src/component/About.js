import React from 'react'
import { useContext } from 'react'
import { useEffect } from 'react';
import noteContext from '../context/notes/noteContext';

const About = () => {
    const a = useContext(noteContext)
    useEffect(() => {
      a.update();
    // eslint-disable-next-line
     }, [])
    
  return (
    <div>
      This is about {a.state.name} and I am in {a.state.class}.
    </div>
  )
}

export default About
