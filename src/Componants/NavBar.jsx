import React from 'react';
import { NavLink } from 'react-router-dom';
import '../Style/Componants/NavBar.css'

function NavBar() {
  return <>
    <nav className='Header-Navbar'>
      <NavLink to="/" className='Header-Navbar-link'>Home</NavLink>
      <NavLink to="/history" className='Header-Navbar-link'>History</NavLink>
      <NavLink to="/create" className='Header-Navbar-link'>Create new Tournament</NavLink>
      <NavLink to="/contact" className='Header-Navbar-link'>Contact</NavLink>
    </nav>
  </>
}

export default NavBar;
