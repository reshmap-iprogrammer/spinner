import './App.css';
import SpinWheel from './components/SpinWheel';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams,
  useSearchParams
} from 'react-router-dom';
import RewardHistory from './components/RewardHistory';
import React, { useEffect, useState } from 'react'
import CryptoJS from "crypto-js";
import { getRequestData } from './services/RequestHandler';
import { route } from './services/ApiRoutes';


function App() {

  const [message, setMessage] = useState(null)

  useEffect(() => {
    document.addEventListener("message", function(data) {
      alert(data.data);
      });
  })

  


// let linkData = document.location.href.split('=')?.[1]
let linkDatas = "U2FsdGVkX19p15GCzPYVtx7DwPAwldwewsUcC%2F%2BNe8ZEnIrdgUPZo0q3HGFokCDCSDGMInageg%2FuuhYo98OCgA%3D%3D"
    let linkData = decodeURIComponent(linkDatas); 
    let bytes = CryptoJS.AES.decrypt(linkData,'VE1LLVNFRUQtRU5DLURFQw==')
      let decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
          // alert(JSON.stringify(decryptedData))
          // alert(decryptedData.msisdn)


  const btnClick =  () => {
    // const rewardResponse = await getRequestData(route["GET_REWARD_HISTORY"]);
    // const message = JSON.stringify(rewardResponse?.data);
    // setMessage(message);

    alert(message)
    
       if (window.ReactNativeWebView && message) {
      window.ReactNativeWebView.postMessage(message);
    }
    // window.ReactNativeWebView.postMessage(JSON.stringify(rewardResponse?.data));
    // if(rewardResponse?.data){
    //   // window.ReactNativeWebView.postMessage('Data from WebView / Website');
    //   // window.parent.postMessage("Data to app")
    // }
  }

  useEffect(async() => {
    const rewardResponse = await getRequestData(route["GET_SPIN"]);
    const message = JSON.stringify(rewardResponse?.data?.SpinWheelCouponData[0]);
    setMessage(message);
    
  }, [])
  

  useEffect(() => {
    // if (window.ReactNativeWebView && message?.length > 0) {
    //   window.ReactNativeWebView.postMessage(message);
    // }
    console.log('object', message)
  }, [message])
  

  return (
    <Router>
      <button onClick={btnClick}>Hi</button>
      <Routes>
        <Route path="/" element={<SpinWheel tagline={''} />} />
        <Route path="/rewardHistory" element={<RewardHistory />} />
      </Routes>
    </Router>
  );
}

export default App;



