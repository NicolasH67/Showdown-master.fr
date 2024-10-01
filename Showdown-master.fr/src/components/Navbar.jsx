import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import './Navbar.css';
import supabase from '../supabaseClient';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate(); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [adminPassword, setAdminPassword] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false); // État pour vérifier si admin est connecté
  const [error, setError] = useState('');
  const passwordInputRef = useRef(null);
  const [tournamentId, setTournamentId] = useState(null);

  // Vérifie si l'utilisateur est sur une page de tournoi
  const isTournamentPage = location.pathname.startsWith('/tournament');

  useEffect(() => {
    const id = location.pathname.split('/')[2];
    setTournamentId(id);
  }, [location.pathname]);

  const fetchAdminPassword = async () => {
    if (!tournamentId) return;

    const { data, error } = await supabase
      .from('tournament')
      .select('admin_password')
      .eq('id', tournamentId)
      .single();

    if (error) {
      console.error('Erreur lors de la récupération du mot de passe admin :', error);
      return;
    }

    setAdminPassword(data?.admin_password);
  };

  useEffect(() => {
    fetchAdminPassword();
  }, [tournamentId]);

  const handleLoginClick = () => {
    setIsModalOpen(true);
    setError('');
    setPassword('');
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();

    if (password === adminPassword) {
      setIsModalOpen(false);
      setIsAdmin(true);

      console.log("password is correct")
      // Rediriger en fonction de la page actuelle
      if (location.pathname.includes('players')) {
        navigate(`/tournament/${tournamentId}/admin/players`);
      } else if (location.pathname.includes('groups')) {
        navigate(`/tournament/${tournamentId}/admin/groups`);
      } else if (location.pathname.includes('schedule')) {
        navigate(`/tournament/${tournamentId}/admin/schedule`);
      } else {
        navigate(`/tournament/${tournamentId}/admin/edit`);
      }
    } else {
      setError('Mot de passe incorrect');
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setPassword('');
    setError('');
  };

  // Focus sur l'input quand la modale s'ouvre
  useEffect(() => {
    if (isModalOpen && passwordInputRef.current) {
      passwordInputRef.current.focus();
    }
  }, [isModalOpen]);

  // Gérer la fermeture de la modale avec "Escape"
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        handleModalClose();
      }
    };

    if (isModalOpen) {
      document.addEventListener('keydown', handleEscape);
    } else {
      document.removeEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isModalOpen]);

  return (
    <>
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
                <Link to={`/tournament/${tournamentId}/${isAdmin ? 'admin/players' : 'players'}`} className={location.pathname.includes('players') ? 'active' : ''}>
                  {isAdmin ? 'Édition des Joueurs' : 'Joueurs'}
                </Link>
              </li>
              <li>
                <Link to={`/tournament/${tournamentId}/${isAdmin ? 'admin/groups' : 'groups'}`} className={location.pathname.includes('groups') ? 'active' : ''}>
                  {isAdmin ? 'Édition des Groupes' : 'Groupes'}
                </Link>
              </li>
              <li>
                <Link to={`/tournament/${tournamentId}/${isAdmin ? 'admin/schedule' : 'schedule'}`} className={location.pathname.includes('schedule') ? 'active' : ''}>
                  {isAdmin ? 'Édition du Planning' : 'Planning'}
                </Link>
              </li>
              <li>
                {!isAdmin ? (
                  <button onClick={handleLoginClick} className={location.pathname.includes('admin') ? 'active' : ''}>
                    Admin Login
                  </button>
                ) : (
                  <Link to={`/tournament/${tournamentId}/admin/edit`} className={location.pathname.includes('edit') ? 'active' : ''}>
                    Édition du tournoi
                  </Link>
                )}
              </li>
            </>
          )}
        </ul>
      </nav>

      {/* Modal pour le mot de passe admin */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Entrez le mot de passe admin</h2>
            <form onSubmit={handlePasswordSubmit}>
              <input
                type="password"
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                ref={passwordInputRef}
                aria-label="Mot de passe"
                required
              />
              {error && <p className="error">{error}</p>}
              <button type="submit">Soumettre</button>
              <button type="button" onClick={handleModalClose}>Annuler</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
