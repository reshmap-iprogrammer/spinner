import './App.css';
import SpinWheel from './components/SpinWheel';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import RewardHistory from './components/RewardHistory';
import React, { useEffect } from 'react'
import CryptoJS from "crypto-js";
import { getRequestData } from './services/RequestHandler';
import { route } from './services/ApiRoutes';


function App() {

  useEffect(() => {
    document.addEventListener("message", function (data) {
      alert(data.data);
    });
  })


  const btnClick = async () => {
    const rewardResponse = await getRequestData(route["GET_SPIN"]);
    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage(JSON.stringify(rewardResponse?.data?.SpinWheelCouponData[0]))
    }
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



