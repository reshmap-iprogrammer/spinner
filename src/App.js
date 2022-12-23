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

function App() {
  // let [searchParams, setSearchParams] = useSearchParams()
  // const term = searchParams.get("msidin")
  let msidin  = useParams();
  alert(msidin)

  // useEffect(() => {
  //   return () => {
  //     document.addEventListener("message", function(data) {
  //       alert("i", data)
  //       alert(data.data);
  //       });
  // }
  // }, [])


  const btnClick = () => {
    window.ReactNativeWebView.postMessage('Data from WebView / Website');
  }

  return (
    <Router>
      {/* <button onClick={btnClick}>Hi</button> */}
      <Routes>
        <Route path="/" element={<SpinWheel tagline={''} />} />
        <Route path=":msidin" element={<RewardHistory />} />
      </Routes>
    </Router>
  );
}

export default App;



