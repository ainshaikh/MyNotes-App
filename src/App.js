import './App.css';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Navbar from './component/Navbar';
import Home from './component/Home';
import About from './component/About';
import NoteState from './context/notes/NoteState';


function App() {
  return (
   <>
   <NoteState>
    <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path='/home' element= {<Home />}/>
      <Route path='/about' element = {<About />} />
    </Routes>
    </BrowserRouter>
    </NoteState>
   </>
  );
}

export default App;