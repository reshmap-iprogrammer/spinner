import './App.css';
import SpinWheel from './components/SpinWheel';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import RewardHistory from './components/RewardHistory';
import React, { useEffect } from 'react'
import { useParams } from "react-router-dom";

function App() {
  const {msidin} = useParams();
  // alert("data", msidin)
  useEffect(() => {
    return () => {
      document.addEventListener("message", function(data) {
        alert(data.msidin);
        });
  }
  }, [])


  const btnClick = () => {
    window.ReactNativeWebView.postMessage('Data from WebView / Website');
  }

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



