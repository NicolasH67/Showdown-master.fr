import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; 
import supabase from '../supabaseClient';
import './Players.css';

const Players = () => {
  const { id } = useParams(); // Utilisation de `id` comme paramètre de l'URL
  console.log('Tournament ID from URL:', id); 

  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) {
      console.error('Tournament ID is not defined!');
      return;
    }

    const fetchPlayers = async () => {
      try {
        let { data, error } = await supabase
          .from('player')
          .select('id, firstname, lastname, gender, tournament_id'); 

        if (error) {
          throw error;
        }

        console.log('Données récupérées :', data); 
        
        const parsedTournamentId = parseInt(id, 10); // Conversion de `id` en entier
        console.log('Parsed Tournament ID:', parsedTournamentId);

        const filteredPlayers = data.filter(player => player.tournament_id === parsedTournamentId); 
        console.log('Filtered Players:', filteredPlayers); 

        setPlayers(filteredPlayers);
      } catch (error) {
        console.error('Erreur lors de la récupération des joueurs :', error);
        setError(error); 
      } finally {
        setLoading(false);
      }
    };

    fetchPlayers();
  }, [id]); // Utilisation de `id` comme dépendance

  if (loading) {
    return <div>Chargement des joueurs...</div>;
  }

  if (error) {
    return <div>Erreur lors de la récupération des joueurs : {error.message}</div>;
  }

  // Séparer les joueurs par genre ou type
  const malePlayers = players.filter(player => player.gender === 2); 
  const femalePlayers = players.filter(player => player.gender === 1); 
  const teamPlayers = players.filter(player => player.gender === 0); 

  return (
    <div>
      <h1>Liste des joueurs</h1>

      {/* Afficher la section "Joueurs Masculins" seulement si `malePlayers` contient des données */}
      {malePlayers.length > 0 && (
        <>
          <h2>Joueurs Masculins</h2>
          <table>
            <thead>
              <tr>
                <th>Nom et prénom</th>
              </tr>
            </thead>
            <tbody>
              {malePlayers.map(player => (
                <tr key={player.id}>
                  <td>{player.firstname} {player.lastname}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {/* Afficher la section "Joueuses Féminines" seulement si `femalePlayers` contient des données */}
      {femalePlayers.length > 0 && (
        <>
          <h2>Joueuses Féminines</h2>
          <table>
            <thead>
              <tr>
                <th>Nom et prénom</th>
              </tr>
            </thead>
            <tbody>
              {femalePlayers.map(player => (
                <tr key={player.id}>
                  <td>{player.firstname} {player.lastname}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {/* Afficher la section "Équipes" seulement si `teamPlayers` contient des données */}
      {teamPlayers.length > 0 && (
        <>
          <h2>Équipes</h2>
          <table>
            <thead>
              <tr>
                <th>Nom de l'équipe</th>
              </tr>
            </thead>
            <tbody>
              {teamPlayers.map(player => (
                <tr key={player.id}>
                  <td>{player.firstname} {player.lastname}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default Players;
