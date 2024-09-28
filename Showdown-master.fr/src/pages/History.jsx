import React, { useEffect, useState, useRef } from 'react';
import supabase from '../supabaseClient';
import './Home.css';

const History = () => {
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTournament, setSelectedTournament] = useState(null);
  const [password, setPassword] = useState('');
  const passwordInputRef = useRef(null); // Pour gérer le focus sur le champ de mot de passe

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        let { data, error } = await supabase
          .from('tournament')
          .select('id, title, startday, endday, user_password'); // Vérifie les noms des colonnes

        if (error) {
          throw error;
        }

        console.log('Données récupérées :', data); // Vérifie ici que les données sont récupérées correctement

        const today = new Date();
        const filteredTournaments = data
          .filter(tournament => new Date(tournament.endday) < today) // Garder uniquement les tournois terminés
          .sort((a, b) => new Date(b.enday) - new Date(a.endday)); // Trier par date de fin (du plus récent au plus ancien)

        setTournaments(filteredTournaments);
      } catch (error) {
        console.error('Erreur lors de la récupération des tournois :', error);
      } finally {
        setLoading(false); // Arrête le chargement même en cas d'erreur
      }
    };

    fetchTournaments();
  }, []);

  useEffect(() => {
    if (isModalOpen && passwordInputRef.current) {
      passwordInputRef.current.focus(); // Placer le focus sur l'input de mot de passe quand la modale s'ouvre
    }
  }, [isModalOpen]);

  const handleTournamentClick = (tournament) => {
    if (tournament.user_password) {
      setSelectedTournament(tournament);
      setIsModalOpen(true);
    } else {
      // Naviguer vers la page de détails directement si pas de mot de passe
      window.location.href = `/tournament/${tournament.id}`;
    }
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (password === selectedTournament.user_password) {
      // Si le mot de passe est correct, naviguer vers la page de détails
      window.location.href = `/tournament/${selectedTournament.id}`;
    } else {
      alert('Mot de passe incorrect');
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setPassword('');
    setSelectedTournament(null);
  };

  if (loading) {
    return <div>Chargement...</div>;
  }

  return (
    <div>
      <h1>Historique des tournois</h1>
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
                <td>{new Date(tournament.startday).toLocaleDateString()}</td>
                <td>{new Date(tournament.endday).toLocaleDateString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">Aucun tournoi passé disponible</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pop-up pour le mot de passe */}
      {isModalOpen && (
        <div
          className="modal-overlay"
          role="dialog"
          aria-labelledby="modal-title"
          aria-modal="true"
          onKeyDown={(e) => e.key === 'Escape' && handleModalClose()} // Fermer la modale avec "Escape"
        >
          <div className="modal">
            <h2 id="modal-title">Entrez le mot de passe</h2>
            <form onSubmit={handlePasswordSubmit}>
              <input
                type="password"
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                ref={passwordInputRef} // Gérer le focus
                aria-label="Mot de passe"
                required
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

export default History;
