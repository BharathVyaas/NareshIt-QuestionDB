import logo from './logo.svg';
import './App.css';
import Home from './pages/admin/home/Home';
import Technologies from './pages/admin/technology/Technologies';
import Modules from './pages/admin/module/Modules';
import Subtopics from './pages/admin/subtopic/Subtopics';
import Topics from './pages/admin/topic/Topics';
import {Routes,Route,BrowserRouter} from "react-router-dom"



function App() {
  return (
    <>
   
  <BrowserRouter>
  <Routes>
    <Route path='/' exact element={<Home></Home>} />
    <Route path='/technologies' exact  element={<Technologies></Technologies>} />
    <Route path='/modules' exact   element={<Modules></Modules>} />
    <Route path='/subtopics' exact   element={<Subtopics></Subtopics>} />
    <Route path='/topics' exact   element={<Topics></Topics>}  />
  </Routes>

  </BrowserRouter>
 
  </>

  );
}

export default App;
