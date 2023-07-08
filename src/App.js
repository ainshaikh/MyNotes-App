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
import Alert from './component/Alert';


function App() {
  return (
   <>
   <NoteState>
    <BrowserRouter>
    <Navbar />
    <Alert message = "This is Alert"/>
    <div className='container'>
    <Routes>
      <Route path='/home' element= {<Home />}/>
      <Route path='/about' element = {<About />} />
    </Routes>
    </div>
    </BrowserRouter>
    </NoteState>
   </>
  );
}

export default App;