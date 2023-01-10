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
import { useNavigate } from 'react-router-dom';
import ClaimRewardModal from './components/ClaimRewardModal';


function App() {
const [appToWeb, setappToWeb] = useState()
const [loading, setLoading] = useState(false);
// const navigate = useNavigate();

useEffect(() => {
  document.addEventListener("message", function (data) {
      alert(data.data)
    setappToWeb(data.data);
    setLoading(false);
      // navigate("/RewardHistory")
  }); 
}, [])

  let msisdn;
  let parentMsisdn;
  let circleId;
  let linkDatas = document.location.href.split('=')?.[1]
  if(linkDatas){
    alert('hi')
    alert(appToWeb)
    let linkData = decodeURIComponent(linkDatas);
    let bytes = CryptoJS.AES.decrypt(linkData, 'SE1LLVNSRUQtRU5DLURFQw==')
      let decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
      msisdn = JSON.parse(decryptedData.msisdn)
      parentMsisdn = JSON.parse(decryptedData.parentMsisdn)
      circleId = decryptedData.circleId
  }

  const btnClick = async () => {
    const rewardResponse = await getRequestData(route["GET_SPIN"]);
    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage(JSON.stringify(rewardResponse?.data?.SpinWheelCouponData[0]))
    }
  }


  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<SpinWheel tagline={''} msisdn={msisdn} parentMsisdn={parentMsisdn} circleId={circleId} setLoading={setLoading} loading={loading} />} />
        <Route path="/rewardHistory" element={<RewardHistory  msisdn={msisdn} setLoading={setLoading} loading={loading}/>} />
        <Route path='/claimRewardForm' element={<ClaimPrizeForm />}/>
        <Route path="/claimRewardModal" element={<ClaimRewardModal appToWeb={appToWeb}/>}/>
      </Routes>
    </Router>
    </>
  );
}

export default App;



