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
  // useEffect(() => {
  //                window.addEventListener("message", message => {
  //                 alert(message)
  //              console.log('90$ heyyyyyyyyyyyyyyyyyyyyy', message)
  //            });
  // })

  // const btnClick = () => {
  //   window.ReactNativeWebView.postMessage('Data from WebView / Website');
  // }

  return (
    <Router>
      {/* <button onClick={btnClick}>Hi</button> */}
      <Routes>
        <Route path="/" element={<SpinWheel tagline={''} />} />
        <Route path="/rewardHistory" element={<RewardHistory />} />
      </Routes>
    </Router>
  );
}

export default App;



