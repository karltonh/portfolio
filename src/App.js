import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './Home';
import About from './About';
import SpaceGame from './SpaceGame';
import { Route, Link , Routes} from 'react-router-dom';
import Navbar from './Navbar';
import image1 from "./images/pexels-photo-3227984.jpeg";
import image2 from "./images/pexels-irina-iriser-1707213.jpg";
import { useState, useEffect } from 'react';
function App() {
  const [date, setDate] = useState(new Date());
  const [isDayTime, setDayTime] = useState();
  const [image, setImage] = useState(image1);
  function refreshClock() {
    setDate(new Date());
    setDayTime(date.getHours()>6 && date.getHours()<20);
    if (isDayTime) {
      setImage(image1)
    }
    else{
      setImage(image2)
    }
  }
  useEffect(() => {
    const timerId = setInterval(refreshClock, 1000);
    return function cleanup() {
      
      clearInterval(timerId);
    };
  }, []);
  
    return (
      <div class="topbottomnav">
      <div style={{ 
              backgroundImage: `url(${image})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover"
              }}>
        <div class="topnav">
          <header class="title">Karlton Hall</header>
          <nav class="navigationbar background">
            <ul class="navitems">
            <li><Link to="/">HOME</Link></li>
              <li><Link to="/about">ABOUT</Link></li>
              <li><a href="https://github.com/karltonh"target="_blank">GITHUB</a></li>
            </ul>
          </nav>
        </div>
        <Routes><Route path="/" element={<Home/>}/></Routes>
        <Routes><Route path="/about" element={<About/>}/></Routes>
        <Routes><Route path="/space" element={<SpaceGame/>}/></Routes>
        <div class = "bottomnav">
          <header class = "footer">Karlton Hall 2024</header>
        </div>
      </div>
      </div>
      );
    }



export default App;
