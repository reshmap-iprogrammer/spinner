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
import axios from 'axios';


function App() {


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


  const btnClick = () => {
    // const rewardResponse = await getRequestData(route["GET_REWARD_HISTORY"]);
    // const message = JSON.stringify(rewardResponse?.data);
    // setMessage(message);
    // const rewardResponse = await getRequestData(route["GET_SPIN"]);
    // const message = JSON.stringify(rewardResponse?.data?.SpinWheelCouponData[0]);
     axios.get(
			"https://jsonplaceholder.typicode.com/posts"
		  ).then ((res)=>{
        alert(JSON.stringify(res))
           if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage(JSON.stringify(res));
    }
      });
		  
    // setMessage(message);
    //    if (window.ReactNativeWebView) {
    //   window.ReactNativeWebView.postMessage(message);
    // }
  }

  // useEffect(async() => {
  //   const rewardResponse = await getRequestData(route["GET_SPIN"]);
  //   const message = JSON.stringify(rewardResponse?.data?.SpinWheelCouponData[0]);
  //   setMessage(message);
    
  // }, [])
  
  

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



