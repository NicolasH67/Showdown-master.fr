import React, { useEffect, useState, useRef } from 'react';
import supabase from '../supabaseClient';
import './Home.css';

const UpcomingTournaments = () => {
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTournament, setSelectedTournament] = useState(null);
  const [password, setPassword] = useState('');
  const passwordInputRef = useRef(null);

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        let { data, error } = await supabase
          .from('tournament')
          .select('id, title, startday, endday, user_password');

        if (error) throw error;

        console.log('Données récupérées :', data);

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const filteredTournaments = data
          .filter(tournament => new Date(tournament.startday) >= today) // Prendre les tournois à venir
          .sort((a, b) => new Date(a.startday) - new Date(b.startday)); // Trier par date de début

        setTournaments(filteredTournaments);
      } catch (error) {
        console.error('Erreur lors de la récupération des tournois :', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTournaments();
  }, []);

  useEffect(() => {
    if (isModalOpen && passwordInputRef.current) {
      passwordInputRef.current.focus();
    }
  }, [isModalOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        handleModalClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  const handleTournamentClick = (tournament) => {
    if (tournament.user_password) {
      setSelectedTournament(tournament);
      setIsModalOpen(true);
    } else {
      window.location.href = `/tournament/${tournament.id}/players`;
    }
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (password === selectedTournament.user_password) {
      handleModalClose();
      window.location.href = `/tournament/${selectedTournament.id}/players`;
    } else {
      alert('Mot de passe incorrect');
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setPassword('');
    setSelectedTournament(null);
  };

  if (loading) return <div>Chargement...</div>;

  return (
    <div>
      <h1>Liste des tournois disponibles</h1>
      <table>
        <thead>
          <tr>
            <th>Nom du tournoi</th>
            <th>Date de début</th>
            <th>Date de fin</th>
          </tr>
        </thead>
        <tbody>
          {tournaments.length > 0 ? (
            tournaments.map(tournament => (
              <tr key={tournament.id} onClick={() => handleTournamentClick(tournament)}>
                <td>
                  {tournament.title} {tournament.user_password && <span>(privé)</span>}
                </td>
                <td>{new Intl.DateTimeFormat('fr-FR').format(new Date(tournament.startday))}</td>
                <td>{new Intl.DateTimeFormat('fr-FR').format(new Date(tournament.endday))}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">Aucun tournoi à venir disponible</td>
            </tr>
          )}
        </tbody>
      </table>

      {isModalOpen && (
        <div className="modal-overlay" role="dialog" aria-labelledby="modal-title" aria-modal="true">
          <div className="modal">
            <h2 id="modal-title">Entrez le mot de passe</h2>
            <form onSubmit={handlePasswordSubmit}>
              <input
                type="password"
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                ref={passwordInputRef}
                aria-label="Mot de passe"
                required
                autoFocus
              />
              <button type="submit">Soumettre</button>
              <button type="button" onClick={handleModalClose}>Annuler</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpcomingTournaments;