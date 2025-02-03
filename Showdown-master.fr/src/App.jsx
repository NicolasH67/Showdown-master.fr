// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import History from "./pages/History";
import CreateTournament from "./Pages/CreateTournament";
import Contact from "./pages/Contact";
import Navbar from "./components/Navbar";
import Players from "./pages/Players";
import PlayersEdit from "./pages/PlayersEdit";
import Groups from "./pages/Groups";
import Schedule from "./pages/Schedule";
import AdminEdit from "./pages/AdminEdit";
import ResultEdit from "./pages/ResultEdit";
import GroupsEdit from "./pages/GroupsEdit";
import ScheduleEdit from "./pages/ScheduleEdit";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/history" element={<History />} />
        <Route path="/create-tournament" element={<CreateTournament />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/tournament/:id/players" element={<Players />} />
        <Route path="/tournament/:id/admin/players" element={<PlayersEdit />} />
        <Route path="/tournament/:id/groups" element={<Groups />} />
        <Route path="/tournament/:id/admin/groups" element={<GroupsEdit />} />
        <Route path="/tournament/:id/schedule" element={<Schedule />} />
        <Route
          path="/tournament/:id/admin/schedule"
          element={<ScheduleEdit />}
        />
        <Route path="/tournament/:id/admin/result" element={<ResultEdit />} />
        <Route path="/tournament/:id/admin/edit" element={<AdminEdit />} />
      </Routes>
    </>
  );
};

export default App;
