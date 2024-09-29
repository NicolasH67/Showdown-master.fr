import React, { useEffect, useState } from 'react';
import supabase from '../supabaseClient';
import './Players.css';

const Players = () => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        let { data, error } = await supabase
          .from('player')
          .select('id, firstname, lastname, gender, tournament_id'); // Assurez-vous que ces colonnes existent dans la table

        if (error) {
          throw error;
        }

        console.log('Données récupérées :', data); // Vérifiez ici que les données sont récupérées correctement
        setPlayers(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des joueurs :', error);
        setError(error); // Stocker l'erreur dans l'état
      } finally {
        setLoading(false); // Arrête le chargement même en cas d'erreur
      }
    };

    fetchPlayers();
  }, []);

  if (loading) {
    return <div>Chargement des joueurs...</div>;
  }

  if (error) {
    return <div>Erreur lors de la récupération des joueurs : {error.message}</div>;
  }

  // Séparer les joueurs par genre ou type
  const malePlayers = players.filter(player => player.gender === 2); // 2 pour les hommes
  const femalePlayers = players.filter(player => player.gender === 1); // 1 pour les femmes
  const teamPlayers = players.filter(player => player.gender === 0); // 0 pour les équipes

  return (
    <div>
      <h1>Liste des joueurs</h1>

      <h2>Joueurs Masculins</h2>
      <table>
        <thead>
          <tr>
            <th>Nom et prénom</th>
          </tr>
        </thead>
        <tbody>
          {malePlayers.length > 0 ? (
            malePlayers.map(player => (
              <tr key={player.id}>
                <td>{player.firstname} {player.lastname}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2">Aucun joueur masculin trouvé</td>
            </tr>
          )}
        </tbody>
      </table>

      <h2>Joueuses Féminines</h2>
      <table>
        <thead>
          <tr>
            <th>Nom et prénom</th>
          </tr>
        </thead>
        <tbody>
          {femalePlayers.length > 0 ? (
            femalePlayers.map(player => (
              <tr key={player.id}>
                <td>{player.firstname} {player.lastname}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2">Aucune joueuse féminine trouvée</td>
            </tr>
          )}
        </tbody>
      </table>

      <h2>Équipes</h2>
      <table>
        <thead>
          <tr>
            <th>Team</th>
          </tr>
        </thead>
        <tbody>
          {teamPlayers.length > 0 ? (
            teamPlayers.map(player => (
              <tr key={player.id}>
                <td>{player.firstname} {player.lastname}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2">Aucune équipe trouvée</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Players;
