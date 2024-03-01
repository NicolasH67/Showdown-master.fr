import React from 'react';
import { NavLink } from 'react-router-dom';
import '../Style/Componants/NavBarTournament.css'

function NavBarTournament() {
    const isAdmin = false
    const id = "1"
  return <>
    <nav className='Tournament-Navbar'>
        <NavLink to={`/tournament/${id}`} className='Tournament-Navbar-link' end>Détail du tournoi</NavLink>
        <NavLink to={`/tournament/${id}/player`} className='Tournament-Navbar-link'>Player</NavLink>
        <NavLink to={`/tournament/${id}/groups`} className='Tournament-Navbar-link'>Groups</NavLink>
        <NavLink to={`/tournament/${id}/schedule`} className='Tournament-Navbar-link'>Schedule</NavLink>
        <NavLink to={`/tournament/${id}/referee`} className='Tournament-Navbar-link'>Referee</NavLink>
        <NavLink to={`/tournament/${id}/admin`} className='Tournament-Navbar-link'>Admin</NavLink>
    </nav>
  </>
}


export default NavBarTournament;
