import './App.css';
import SpinWheel from './components/SpinWheel';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import RewardHistory from './components/RewardHistory';
import React, { useEffect } from 'react'

function App() {
  useEffect(() => {
    document.addEventListener("message", function (data) {
      console.log('helllllllllooooooooooo jjj')
      alert("helloooo jjj");
      console.log('helllllllllooooooooooo')
    });
                 window.addEventListener("message", message => {
               alert("hiiii")
               console.log('90$ heyyyyyyyyyyyyyyyyyyyyy')
             });
  })
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SpinWheel tagline={''} />} />
        <Route path="/rewardHistory" element={<RewardHistory />} />
      </Routes>
    </Router>
  );
}

export default App;
