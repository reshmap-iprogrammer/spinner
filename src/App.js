import './App.css';
import SpinWheel from './components/SpinWheel';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import RewardHistory from './components/RewardHistory';
import React, { useEffect } from 'react'
import { getRequestData } from './services/RequestHandler';
import { route } from './services/ApiRoutes';
import ClaimPrizeForm from './components/ClaimPrizeForm';


function App() {


  // useEffect(() => {
  //   AppToWeb();
  // })

  const AppToWeb = () => {
    document.addEventListener("message", function (data) {
      setTimeout(() => {
        alert(data.data);
      }, 3000);
    });
  }


  const btnClick = async () => {

    const rewardResponse = await getRequestData(route["GET_SPIN"]);
    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage(JSON.stringify(rewardResponse?.data?.SpinWheelCouponData[0]))
    }
  }


  return (
    <Router>
      <button onClick={AppToWeb}>Hi</button>
      <Routes>
        <Route path="/" element={<SpinWheel tagline={''} />} />
        <Route path="/rewardHistory" element={<RewardHistory />} />
        <Route path='/claimRewardForm' element={<ClaimPrizeForm />}/>
      </Routes>
    </Router>
  );
}

export default App;



