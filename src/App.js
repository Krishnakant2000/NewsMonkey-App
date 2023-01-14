import './App.css';
import NavBar from "./components/NavBar.js";
import News from "./components/News.js";
import React, { useState } from 'react'
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'


const App = () => {
  const pgSize = 5;
  const apiKey = process.env.REACT_APP_NEWS_API;
  
  const [progress,setProgress] = useState(0);

    return (
      <div>
        <Router>
        <NavBar />
        <LoadingBar
        height={5}
        color='#f11946'
        progress={progress} 
        />
          <Routes>
            <Route exact path='/' element={<News setProgress={setProgress} apiKey={apiKey} key='General' pageSize={pgSize} country='in' category='General' />}></Route>
            <Route exact path='/General' element={<News setProgress={setProgress} apiKey={apiKey} key='General' pageSize={pgSize} country='in' category='General' />}></Route>
            <Route exact path='/Business' element={<News setProgress={setProgress} apiKey={apiKey} key='Business' pageSize={pgSize} country='in' category='Business' />}></Route>
            <Route exact path='/Entertainment' element={<News setProgress={setProgress} apiKey={apiKey} key='Entertainment' pageSize={pgSize} country='in' category='Entertainment' />}></Route>
            <Route exact path='/Health' element={<News setProgress={setProgress} apiKey={apiKey} key='Health' pageSize={pgSize} country='in' category='Health' />}></Route>
            <Route exact path='/Science' element={<News setProgress={setProgress} apiKey={apiKey} key='Science' pageSize={pgSize} country='in' category='Science' />}></Route>
            <Route exact path='/Sports' element={<News setProgress={setProgress} apiKey={apiKey} key='Sports' pageSize={pgSize} country='in' category='Sports' />}></Route>
            <Route exact path='/Technology' element={<News setProgress={setProgress} apiKey={apiKey} key='Technology' pageSize={pgSize} country='in' category='Technology' />}></Route>
          </Routes>
        </Router>
      </div>
    )
  
}

export default App;