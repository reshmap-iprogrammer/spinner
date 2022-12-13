import './App.css';
import SpinWheel from './components/SpinWheel';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import RewardHistory from './components/RewardHistory';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SpinWheel tagline={''} />} />
        <Route path="/rewardHistory" element={<RewardHistory />} />
      </Routes>
    </Router>
  );
}

export default App;
