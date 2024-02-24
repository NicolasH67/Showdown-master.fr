import React from 'react';
import '../Style/Componants/Header.css'
import NavBar from './NavBar'

function Header() {
  return <>
  <header>
    <h1 className="header-h1">Showdown<br />Master</h1>
    <NavBar />
    <h2 className="header-h2">Nicolas HECKER<br />Development</h2>
  </header>
  </>
}

export default Header;
