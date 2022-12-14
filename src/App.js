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


function App() {
const [appToWeb, setappToWeb] = useState()
const [loading, setLoading] = useState(false);
// const navigate = useNavigate();

// useEffect(() => {
//   document.addEventListener("message", function (data) {
//       // alert(data.data)
//       const appData = data?.data
//       if(appData !== undefined){
//         // setappToWeb(appData);
//         localStorage.setItem("dummy", appData)
//         alert(appToWeb)
//       }
//     setLoading(false);
//       // navigate("/RewardHistory")
//   }); 
// }, [])


  let msisdn;
  let parentMsisdn;
  let circleId;
  let linkDatas = document.location.href.split('=')?.[1]
  if(linkDatas){
    let linkData = decodeURIComponent(linkDatas);
    let bytes = CryptoJS.AES.decrypt(linkData, 'SE1LLVNSRUQtRU5DLURFQw==')
      let decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
      msisdn = JSON.parse(decryptedData.msisdn)
      parentMsisdn = JSON.parse(decryptedData.parentMsisdn)
      circleId = decryptedData.circleId
  }

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<SpinWheel tagline={''} msisdn={msisdn} parentMsisdn={parentMsisdn} circleId={circleId} setLoading={setLoading} loading={loading} />} />
        <Route path="/rewardHistory" element={<RewardHistory  msisdn={msisdn} setLoading={setLoading} loading={loading}/>} />
        <Route path='/claimRewardForm' element={<ClaimPrizeForm />}/>
      </Routes>
    </Router>
    </>
  );
}

export default App;



