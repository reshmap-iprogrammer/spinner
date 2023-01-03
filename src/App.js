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

  
  let linkDatas = document.location.href.split('data=').pop()
  let linkData = decodeURIComponent(linkDatas);
  if(linkData?.length){
    let bytes = CryptoJS.AES.decrypt(linkData, 'VE1LLVNFRUQtRU5DLURFQw==')
    if(bytes?.length){
      let decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
      alert(JSON.stringify(decryptedData))
      // alert(decryptedData.msisdn)
    }
  }


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



