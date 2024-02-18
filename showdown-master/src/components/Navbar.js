import React from 'react'
import '../style/Navbar.css'

class Navbar extends React.Component {
    render() {
      return (
        <nav className="navbar">
          <div className="container">
            <a href="/" className="navbar-brand">Showdown-Master</a>
            <ul className="navbar-nav">
              <li className="nav-item">
                <a href="/" className="nav-link">Home</a>
              </li>
              <li className="nav-item">
                <a href="/about" className="nav-link">History</a>
              </li>
              <li className="nav-item">
                <a href="/contact" className="nav-link">Create new tournament</a>
              </li>
            </ul>
          </div>
        </nav>
      );
    }
  }
  
  export default Navbar;