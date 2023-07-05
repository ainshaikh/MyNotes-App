import React, { useState } from "react";

import NoteContext from "./noteContext";

const NoteState = (props)=>{
    const s1 = {
        "name": "xyz",
        "class": "10",
        "single": "yes"
    }
    const [state, setState] = useState(s1);

    const update =()=>{
        setTimeout(() => {
            setState({
                "name": "abc",
                "class": "12th",
                "single": "yes"
            });
        }, 2000);
    }
     return(
        <NoteContext.Provider value = {{state, update}}>
            {props.children}
        </NoteContext.Provider>
     )
}

export default NoteState;