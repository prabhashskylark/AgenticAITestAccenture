import React from 'react';
import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import { BASE_API_URL } from './config';
import Activities from './components/Activities';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import Leaderboard from './components/Leaderboard';

function App() {
  console.log('App mounted. BASE_API_URL =', BASE_API_URL);
  return (
    <div className="App container mt-4">
      <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
        <div className="container-fluid">
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <img src={`${process.env.PUBLIC_URL}/octofitapp-small.svg`} alt="OctoFit" className="octo-logo me-2" />
            <span className="brand-text">OctoFit</span>
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#octofitNavbar" aria-controls="octofitNavbar" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="octofitNavbar">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item"><Link className="nav-link" to="/activities">Activities</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/teams">Teams</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/users">Users</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/workouts">Workouts</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/leaderboard">Leaderboard</Link></li>
            </ul>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<div className="card p-4"><h2 className="h4">Welcome to OctoFit</h2><p>Select a section from the menu.</p></div>} />
        <Route path="/activities" element={<Activities/>} />
        <Route path="/teams" element={<Teams/>} />
        <Route path="/users" element={<Users/>} />
        <Route path="/workouts" element={<Workouts/>} />
        <Route path="/leaderboard" element={<Leaderboard/>} />
      </Routes>
    </div>
  );
}

export default App;
