import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; 
import supabase from '../supabaseClient';
import './Groups.css';

const Groups = () => {
    const { id } = useParams(); // Utilisation de `id` comme paramètre de l'URL
    console.log('Tournament ID from URL:', id); 
  const [groups, setGroups] = useState([]);
  const [players, setPlayers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRound, setSelectedRound] = useState('1st round'); // État pour gérer le tour sélectionné

  useEffect(() => {
    if (!id) {
      console.error('Tournament ID is not defined!');
      return;
    }
  
    const fetchGroupsAndPlayers = async () => {
      try {
        // Récupérer toutes les divisions (groupes) et les joueurs
        let { data: divisionsData, error: divisionsError } = await supabase
          .from('division')
          .select('id, name, round_type, tournament_id'); 
  
        if (divisionsError) {
          throw divisionsError;
        }
  
        let { data: playersData, error: playersError } = await supabase
          .from('player')
          .select('id, firstname, lastname, gender, division_id, tournament_id');
  
        if (playersError) {
          throw playersError;
        }
  
        console.log('Divisions récupérées :', divisionsData);
        console.log('Joueurs récupérés :', playersData);
  
        // Conversion de `tournamentId` en entier
        const parsedTournamentId = parseInt(id, 10); 
        console.log("avant de parsed",id)
        console.log('Parsed Tournament ID:', parsedTournamentId);
  
        // Filtrer les divisions par tournament_id
        const filteredDivisions = divisionsData.filter(division => division.tournament_id === parsedTournamentId);
        console.log('Filtered Divisions:', filteredDivisions);
  
        // Filtrer les joueurs par tournament_id
        const filteredPlayers = playersData.filter(player => player.tournament_id === parsedTournamentId);
        console.log('Filtered Players:', filteredPlayers);
  
        // Regrouper les joueurs par division_id
        const playersByDivision = {};
        filteredPlayers.forEach(player => {
          if (!playersByDivision[player.division_id]) {
            playersByDivision[player.division_id] = [];
          }
          playersByDivision[player.division_id].push(player);
        });
  
        // Mise à jour des états
        setGroups(filteredDivisions); 
        setPlayers(playersByDivision); 
  
      } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
        setError(error); 
      } finally {
        setLoading(false);
      }
    };
  
    fetchGroupsAndPlayers();
  }, [id]); // Utilisation de `tournamentId` comme dépendance
  

  if (loading) {
    return <div>Chargement des groupes...</div>;
  }

  if (error) {
    return <div>Erreur lors de la récupération des groupes : {error.message}</div>;
  }

  // Filtrer les groupes par type de round
  const filteredGroups = groups.filter(group => group.round_type === selectedRound);

  // Fonction pour générer un tableau pour chaque groupe
  const renderPlayerTable = (groupId) => {
    const groupPlayers = players[groupId] || [];

    return (
      <table>
        <thead>
          <tr>
            <th>Place</th>
            <th>Nom du joueur</th>
            <th>Points</th>
            <th>Sets</th>
            <th>Buts</th>
          </tr>
        </thead>
        <tbody>
          {groupPlayers.length > 0 ? (
            groupPlayers.map((player, index) => (
              <tr key={player.id}>
                <td>{index + 1}</td>
                <td>{player.firstname} {player.lastname}</td>
                <td>0 (0:0)</td> {/* Placeholder pour points */}
                <td>0 (0:0)</td> {/* Placeholder pour sets */}
                <td>0 (0:0)</td> {/* Placeholder pour buts */}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">Aucun joueur trouvé pour ce groupe</td>
            </tr>
          )}
        </tbody>
      </table>
    );
  };

  return (
    <div>
      <h1>Groupes du tournoi</h1>

      {/* Boutons de sélection de tour */}
      <div className="round-selector">
        <button onClick={() => setSelectedRound('1st round')}>
          1er Tour
        </button>
        <button onClick={() => setSelectedRound('2nd round')}>
          2e Tour
        </button>
        <button onClick={() => setSelectedRound('final round')}>
          Tour Final
        </button>
      </div>

      {/* Affichage des groupes pour le tour sélectionné */}
      {filteredGroups.length > 0 ? (
        <section>
          <h2>{selectedRound === '1st round' ? '1er Tour' : selectedRound === '2nd round' ? '2e Tour' : 'Tour Final'}</h2>
          {filteredGroups.map(group => (
            <div key={group.id}>
              <h3>{group.name}</h3>
              {renderPlayerTable(group.id)} {/* Afficher le tableau des joueurs */}
            </div>
          ))}
        </section>
      ) : (
        <div>Aucun groupe trouvé pour ce tour.</div>
      )}
    </div>
  );
};

export default Groups;
