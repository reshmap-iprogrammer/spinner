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
    // window.ReactNativeWebView.postMessage(JSON.stringify({"slot_name":"Sony Liv","title":"28 day of","sub_title":"Sony LIV Premium Mobile subscription","overlay_image":"https://vodafoneideaappimages-dev.s3.dualstack.ap-south-1.amazonaws.com/spinTheWheel/spin_the_wheel_overlay_banner1.jpg","detail":"","coupon_code":"","reward_type":"Subscription","description":"Sony LIV Premium Mobile subscription for 28 days","rank":1,"logo_image":"https://vodafoneideaappimages-dev.s3.dualstack.ap-south-1.amazonaws.com/spinTheWheel/spin_the_wheel_logo_banner1.png","internal_link":"sonyLiv","external_link":"","quantity":20,"prize_count":null,"is_big_prize":0,"status":1,"expiry_date":null}));
    // const rewardResponse = await getRequestData(route["GET_REWARD_HISTORY"]);
    // const message = JSON.stringify(rewardResponse?.data);
    // setMessage(message);
    // const rewardResponse = await getRequestData(route["GET_SPIN"]);
    // const message = JSON.stringify(rewardResponse?.data?.SpinWheelCouponData[0]);


     axios.get(
			"https://vilcmsdev.viapplogs.net/api/getSpinWheelCouponBanners"
		  ).then ((res)=>{
        console.log('object',JSON.stringify(res?.data?.SpinWheelCouponData[0]))
        // alert(JSON.stringify(JSON.stringify(res?.data?.SpinWheelCouponData[0])))
           if (window.ReactNativeWebView) {
            window.ReactNativeWebView.postMessage(JSON.stringify(res?.data?.SpinWheelCouponData[0]))
      // window.ReactNativeWebView.postMessage(JSON.stringify({"slot_name":"Sony Liv","title":"28 day of","sub_title":"Sony LIV Premium Mobile subscription","overlay_image":"https://vodafoneideaappimages-dev.s3.dualstack.ap-south-1.amazonaws.com/spinTheWheel/spin_the_wheel_overlay_banner1.jpg","detail":"","coupon_code":"","reward_type":"Subscription","description":"Sony LIV Premium Mobile subscription for 28 days","rank":1,"logo_image":"https://vodafoneideaappimages-dev.s3.dualstack.ap-south-1.amazonaws.com/spinTheWheel/spin_the_wheel_logo_banner1.png","internal_link":"sonyLiv","external_link":"","quantity":20,"prize_count":null,"is_big_prize":0,"status":1,"expiry_date":null}));
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



