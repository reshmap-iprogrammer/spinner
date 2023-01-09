import './App.css';
import SpinWheel from './components/SpinWheel';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import RewardHistory from './components/RewardHistory';
import React, { useEffect, useState } from 'react'
import { getRequestData } from './services/RequestHandler';
import { route } from './services/ApiRoutes';
import ClaimPrizeForm from './components/ClaimPrizeForm';
import CryptoJS from "crypto-js";


function App() {


  let msisdn;
  let parentMsisdn;
  let circleId;
  let linkDatas = document.location.href.split('=')?.[1]
  if(linkDatas){
    let linkData = decodeURIComponent(linkDatas);
    let bytes = CryptoJS.AES.decrypt(linkData, 'VE1LLVNFRUQtRU5DLURFQw==')
      let decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
      msisdn = JSON.parse(decryptedData.msisdn)
      parentMsisdn = JSON.parse(decryptedData.parentMsisdn)
      circleId = JSON.parse(decryptedData.circleId)
  }


  const btnClick = async () => {
    const rewardResponse = await getRequestData(route["GET_SPIN"]);
    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage(JSON.stringify(rewardResponse?.data?.SpinWheelCouponData[0]))
    }
  }
  useEffect(() => {
    document.addEventListener("message", function (data) {
      setTimeout(() => {
        alert(data.data);
      }, 3000);
    });
  }, [])
  

  const AppToWeb = () => {
    alert(1)
    document.addEventListener("message", function (data) {
      alert(2)
      setTimeout(() => {
        alert(data.data);
      }, 3000);
    });
  }

  return (
    <Router>
      <button onClick={AppToWeb}>Hi</button>
      <Routes>
        <Route path="/" element={<SpinWheel tagline={''} msisdn={msisdn} parentMsisdn={parentMsisdn} circleId={parentMsisdn}/>} />
        <Route path="/rewardHistory" element={<RewardHistory  msisdn={msisdn}/>} />
        <Route path='/claimRewardForm' element={<ClaimPrizeForm />}/>
      </Routes>
    </Router>
  );
}

export default App;



