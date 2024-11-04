// src/App.js
import React from 'react';
import { Link } from 'react-router-dom';
import Leaderboard from './components/Leaderboard.jsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Typing from './components/Typing.jsx';
import Results from './components/Results';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/test" element={<Typing />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </Router>
  );
}

export default App;
