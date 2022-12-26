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
import React, { useEffect } from 'react'
import CryptoJS from "crypto-js";


function App() {

  useEffect(() => {
    return () => {
      document.addEventListener("message", function(data) {
        alert('data');
        });
  }
  }, [])


// let linkData = document.location.href.split('=')?.[1]
let linkDatas = "U2FsdGVkX19p15GCzPYVtx7DwPAwldwewsUcC%2F%2BNe8ZEnIrdgUPZo0q3HGFokCDCSDGMInageg%2FuuhYo98OCgA%3D%3D"
    let linkData = decodeURIComponent(linkDatas); 
    let bytes = CryptoJS.AES.decrypt(linkData,'VE1LLVNFRUQtRU5DLURFQw==')
      let decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
          // alert(JSON.stringify(decryptedData))
          // alert(decryptedData.msisdn)



  const btnClick = () => {
    window.ReactNativeWebView.postMessage('Data from WebView / Website');
  }

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



