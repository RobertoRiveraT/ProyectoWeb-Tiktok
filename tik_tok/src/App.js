import './App.css';
import Navbar from './Navbar';
import Login from './Login';
import Signup from './Signup';
import Video from './Video';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import VideoFeed from './VideoFeed';
import ProfileSearch from './ProfileSearch';
import Profile from './Profile';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/profile/:username" element={<Profile/>}/>
            <Route path="/profile/search" element={<ProfileSearch/>}/>
            <Route path="/video/:video_id" element={<Video />}/>
            <Route path="/feed" element={<VideoFeed />}/>
            <Route path="/signup" element={<Signup />}/>
            <Route path="/" element={<Login />}/>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
