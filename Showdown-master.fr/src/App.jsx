// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import History from './Pages/History';
import CreateTournament from './Pages/CreateTournament';
import Contact from './Pages/Contact';
import Navbar from './components/Navbar';
import TournamentDetails from './Pages/TournamentDetails'

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
      </Routes>
    </>
  );
};

export default App;
