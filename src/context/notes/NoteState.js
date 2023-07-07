import React from "react";
import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props)=>{
  const notesInitial =  [
        {
          "_id": "64a798869c08872fea61b112",
          "title": "notes",
          "description": "Trees grow faster in rainy season",
          "tag": "Science",
          "date": "2023-07-07T04:45:58.043Z",
          "__v": 0
        },
        {
          "_id": "64a798a99c08872fea61b118",
          "title": "note11s",
          "description": "Treess grow faster in rainy season",
          "tag": "Science",
          "date": "2023-07-07T04:46:33.164Z",
          "__v": 0
        },
        {
            "_id": "64a798869c08872fea61b112",
            "title": "notes",
            "description": "Trees grow faster in rainy season",
            "tag": "Science",
            "date": "2023-07-07T04:45:58.043Z",
            "__v": 0
          },
          {
            "_id": "64a798a99c08872fea61b118",
            "title": "note11s",
            "description": "Treess grow faster in rainy season",
            "tag": "Science",
            "date": "2023-07-07T04:46:33.164Z",
            "__v": 0
          },
          {
            "_id": "64a798869c08872fea61b112",
            "title": "notes",
            "description": "Trees grow faster in rainy season",
            "tag": "Science",
            "date": "2023-07-07T04:45:58.043Z",
            "__v": 0
          },
          {
            "_id": "64a798a99c08872fea61b118",
            "title": "note11s",
            "description": "Treess grow faster in rainy season",
            "tag": "Science",
            "date": "2023-07-07T04:46:33.164Z",
            "__v": 0
          }
      ]
  
    const [notes, setNotes] = useState(notesInitial)

     return(
        <NoteContext.Provider value={{notes, setNotes}}>
            {props.children}
        </NoteContext.Provider>
     )
}

export default NoteState;