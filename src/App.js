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
import Loader from './components/Loader';
import CommonModal from './components/CommonModal';


function App() {
const [appToWeb, setappToWeb] = useState()
const [loading, setLoading] = useState(false);

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
      circleId = decryptedData.circleId
  }

  // const btnClick = async () => {
  //   const rewardResponse = await getRequestData(route["GET_SPIN"]);
  //   if (window.ReactNativeWebView) {
  //     window.ReactNativeWebView.postMessage(JSON.stringify(rewardResponse?.data?.SpinWheelCouponData[0]))
  //   }
  // }
  useEffect(() => {
    document.addEventListener("message", function (data) {
        setappToWeb(data.data);
    });
  }, [appToWeb])


const btnClick = () => {
  setLoading(true);
  setTimeout(() => {
    alert(appToWeb)
    setLoading(false);
  }, 3000);
}
    


  return (
    <Router>
      <button onClick={btnClick} id="btn">{!loading ? 'claim reward' : <Loader />}</button>
      <Routes>
        <Route path="/" element={<SpinWheel tagline={''} msisdn={msisdn} parentMsisdn={parentMsisdn} circleId={circleId} appToWeb={appToWeb}/>} />
        <Route path="/rewardHistory" element={<RewardHistory  msisdn={msisdn}/>} />
        <Route path='/claimRewardForm' element={<ClaimPrizeForm />}/>
      </Routes>
    </Router>
  );
}

export default App;



