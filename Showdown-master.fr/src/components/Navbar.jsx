import { Link, useLocation } from "react-router-dom";
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
            Accueil
          </Link>
        </li>
        <li>
          <Link to="/history" className={location.pathname === '/history' ? 'active' : ''}>
            Historique
          </Link>
        </li>
        <li>
          <Link to="/create-tournament" className={location.pathname === '/create-tournament' ? 'active' : ''}>
            Créer un nouveau tournoi
          </Link>
        </li>
        <li>
          <Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''}>
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
