import './App.css';
// import Base from './components/Base'
import Login from './components/Login';
import Signup from './components/Signup';
import Index from './components/Index';
import Template from './components/Template';
import BaseNav from './components/BaseNav';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import TurocardsState from './components/context/turocards/TurocardsState';
import Card1 from './components/turoTemplates/Card1';
import Card2 from './components/turoTemplates/Card2';
import Card3 from './components/turoTemplates/Card3';
import CommentCard from './components/CommentCard';
import MyCards from './components/MyCards';
import Four04 from './components/Four04';
import SwapRequest from './components/SwapRequest';
function App() {
  return (
  <>
    <TurocardsState>
    <Router> 
      <BaseNav/> 
      <Routes>
      <Route exact path="/" element={<Login />} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/signup" element={<Signup />} />
      <Route exact path="/templates" element={<Template/>} />  
      <Route exact path="/mycards" element={<MyCards/>} />  
      <Route exact path="/swaprequests" element={<SwapRequest/>} />  
      </Routes>


      <Routes>
      <Route exact path="/index" element={<Index/>} />
      </Routes>

      <Routes>
      <Route exact path="/templates/card1" element={<Card1/>} />
      <Route exact path="/templates/card2" element={<Card2/>} />
      <Route exact path="/templates/card3" element={<Card3/>} />
      </Routes>

      <Routes>
      <Route exact path="/card/:id/commnets" element={<CommentCard/>}/>
      </Routes>

      <Routes>
        <Route exact path ="/time-out/" element={<Four04/>}></Route>
      </Routes>
    </Router>
    </TurocardsState>
  </>
  );
}

export default App;
