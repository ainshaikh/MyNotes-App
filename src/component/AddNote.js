
import React, { useContext } from 'react';
import noteContext from '../context/notes/noteContext';
import { useState } from 'react';

const Addnote = (props) => {

    const context = useContext(noteContext);
    const {addNote} = context;

    const [note, setNote] = useState({title: "", description: "", tag: ""})
    const handleClick =(e) =>{
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({title: "", description: "", tag: ""})
        props.showAlert("Added successfully", "success")
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
    <input type="text" className = "form-control" id="title" value={note.title}  name = "title" onChange={handlingChange} aria-describedby="emailHelp"/>
    <div id="emailHelp" minLength={5} required className = "form-text"></div>
  </div>
  <div className = "mb-3">
    <label htmlFor="description" className = "form-label">Description</label>
    <input type="text" className = "form-control" id="description" value={note.description} name='description' minLength={5} required onChange={handlingChange}/>
  </div>
  <div className = "mb-3">
    <label htmlFor="tag" className = "form-label">Tag</label>
    <input type="text" className = "form-control" id="tag" value={note.tag} name='tag' minLength={5} required onChange={handlingChange}/>
  </div>

  <button disabled={note.title.length<5 || note.description.length<5} type="submit" className = "btn btn-primary" onClick={handleClick}>Add Note</button>
</form>
</div>
  
   
    </div>
  )
}

export default Addnote
