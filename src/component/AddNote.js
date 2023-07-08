
import React, { useContext } from 'react';
import noteContext from '../context/notes/noteContext';
import { useState } from 'react';

const Addnote = () => {

    const context = useContext(noteContext);
    const {addNote} = context;

    const [note, setNote] = useState({title: "", description: "", tag: "default"})
    const handleClick =(e) =>{
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
    }

    const handlingChange =(e)=>{
        setNote({...note, [e.target.name]: e.target.value})
    }

  return (
    <div className=' container my-3'>
    <h2>Add a Note</h2>
    <div className='my-3'>
    <form className='my-3'>
  <div className = "mb-3">
    <label htmlFor="title" className = "form-label">Title</label>
    <input type="text" className = "form-control" id="title" name = "title" onChange={handlingChange} aria-describedby="emailHelp"/>
    <div id="emailHelp" className = "form-text"></div>
  </div>
  <div className = "mb-3">
    <label htmlFor="desc" className = "form-label">Description</label>
    <input type="text" className = "form-control" id="description" name='description' onChange={handlingChange}/>
  </div>

  <button type="submit" className = "btn btn-primary" onClick={handleClick}>Add Note</button>
</form>
</div>
  
   
    </div>
  )
}

export default Addnote
