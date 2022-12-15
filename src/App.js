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
                 window.addEventListener("message", message => {
               console.log('90$ heyyyyyyyyyyyyyyyyyyyyy', message)
             });
  })

  const btnClick = () => {
    window.ReactNativeWebView.postMessage('Data from WebView / Website');
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<SpinWheel tagline={''} />} />
        <Route path="/rewardHistory" element={<RewardHistory />} />
      </Routes>
      <button onClick={btnClick}>Hi</button>
    </Router>
  );
}

export default App;
