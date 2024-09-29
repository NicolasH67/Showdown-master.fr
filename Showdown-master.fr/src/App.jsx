// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import History from './Pages/History';
import CreateTournament from './Pages/CreateTournament';
import Contact from './Pages/Contact';
import Navbar from './components/Navbar';
import TournamentDetails from './Pages/TournamentDetails'
import Players from './Pages/Players'

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
      </Routes>
    </>
  );
};

export default App;
