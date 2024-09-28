import { Link, useLocation } from "react-router-dom";
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();

  // Vérifie si l'utilisateur est sur une page de tournoi en utilisant l'URL
  const isTournamentPage = location.pathname.startsWith('/tournament');

  // Extraire l'ID du tournoi à partir de l'URL
  const tournamentId = location.pathname.split('/')[2];

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
        {/* Afficher ces éléments uniquement sur les pages de tournoi */}
        {isTournamentPage && tournamentId && (
          <>
            <li>
              <Link to={`/tournament/${tournamentId}/players`} className={location.pathname.includes('players') ? 'active' : ''}>
                Joueurs
              </Link>
            </li>
            <li>
              <Link to={`/tournament/${tournamentId}/groups`} className={location.pathname.includes('groups') ? 'active' : ''}>
                Groupes
              </Link>
            </li>
            <li>
              <Link to={`/tournament/${tournamentId}/schedule`} className={location.pathname.includes('schedule') ? 'active' : ''}>
                Planning
              </Link>
            </li>
            <li>
              <Link to={`/tournament/${tournamentId}/admin`} className={location.pathname.includes('admin') ? 'active' : ''}>
                Admin Login
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
