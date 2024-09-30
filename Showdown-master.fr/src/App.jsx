// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import History from './pages/History';
import CreateTournament from './Pages/CreateTournament';
import Contact from './pages/Contact';
import Navbar from './components/Navbar';
import TournamentDetails from './pages/TournamentDetails'
import Players from './pages/Players'
import Groups from './pages/Groups'

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/history" element={<History />} />
        <Route path="/create-tournament" element={<CreateTournament />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/tournament/:id" element={<TournamentDetails />} />
        <Route path="/tournament/:id/players" element= {<Players />} />
        <Route path="/tournament/:id/groups" element= {<Groups />} />
      </Routes>
    </>
  );
};

export default App;
