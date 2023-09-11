import {useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Loading from "./components/Loading";
import Main from "./components/Main";
import Game from "./components/Game";

function App() {
  const [loading, setLoading] = useState(true);

  setTimeout(()=>{
    setLoading(loading=> loading=false);
  },4500)

  return (
    <div className="App">
      <div className="wrap">
        {loading ? <Loading/> : 
        <Router>
          <Routes>
            <Route path='/' Component={Main}/>
            <Route path='/game' Component={Game}/>
          </Routes>
        </Router>
        }
      </div>
    </div>
  );
}

export default App;
