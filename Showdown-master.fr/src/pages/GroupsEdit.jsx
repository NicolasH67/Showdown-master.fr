import React, { useState, useEffect } from 'react';
import supabase from '../supabaseClient';
import { useParams } from 'react-router-dom';
import './GroupsEdit.css'; // Ajoute un fichier CSS pour aligner le formulaire sur une ligne

const GroupsEdit = () => {
  const { id } = useParams(); // Récupérer l'ID du tournoi depuis l'URL
  const [groupName, setGroupName] = useState('');
  const [roundType, setRoundType] = useState('1st round'); // Sélectionner le type de round par défaut
  const [highestPosition, setHighestPosition] = useState(null); // Nouvel état pour highest_position
  const [groupType, setGroupType] = useState('mix'); // Nouvel état pour groupType
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [groups, setGroups] = useState([]);
  const [players, setPlayers] = useState({});
  const [selectedRound, setSelectedRound] = useState('1st round'); // État pour filtrer les groupes par round

  // Fonction pour récupérer les groupes et les joueurs existants
  useEffect(() => {
    const fetchGroupsAndPlayers = async () => {
      try {
        let { data: divisionsData, error: divisionsError } = await supabase
          .from('division')
          .select('id, name, round_type, tournament_id, group_type');

        let { data: playersData, error: playersError } = await supabase
          .from('player')
          .select('id, firstname, lastname, division_id');

        if (divisionsError) throw divisionsError;
        if (playersError) throw playersError;

        const filteredGroups = divisionsData.filter(division => division.tournament_id === parseInt(id, 10));
        const playersByDivision = {};
        playersData.forEach(player => {
          if (!playersByDivision[player.division_id]) {
            playersByDivision[player.division_id] = [];
          }
          playersByDivision[player.division_id].push(player);
        });

        setGroups(filteredGroups);
        setPlayers(playersByDivision);

      } catch (error) {
        console.error("Erreur lors de la récupération des groupes et des joueurs :", error);
      }
    };

    fetchGroupsAndPlayers();
  }, [id]);

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!groupName) {
      setError("Le nom du groupe est requis.");
      return;
    }

    try {
      const { data, error } = await supabase
        .from('division')
        .insert([
          {
            name: groupName,
            round_type: roundType,
            highest_position: highestPosition ? parseInt(highestPosition, 10) : null, // Assurez-vous que highest_position est bien un nombre ou null
            group_type: groupType, // Ajout du type de groupe
            tournament_id: id,
          }
        ]);

      if (error) throw error;

      setSuccess("Le groupe a été créé avec succès !");
      setGroupName(''); 
      setRoundType('1st round');
      setHighestPosition(null); // Réinitialiser le champ
      setGroupType('mix'); // Réinitialiser le type de groupe
      setError(null);

      // Réactualiser les groupes après création
      const { data: newGroups, error: fetchError } = await supabase
        .from('division')
        .select('id, name, round_type, tournament_id, group_type')
        .eq('tournament_id', id);

      if (fetchError) throw fetchError;
      setGroups(newGroups);

    } catch (error) {
      console.error("Erreur lors de la création du groupe :", error);
      setError(error.message);
    }
  };

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
                <td>{player.points}</td> {/* Placeholder pour points */}
                <td>{player.sets}</td> {/* Placeholder pour sets */}
                <td>{player.goals}</td> {/* Placeholder pour buts */}
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

  // Filtrer les groupes en fonction du tour sélectionné
  const filteredGroups = groups.filter(group => group.round_type === selectedRound);

  return (
    <div>
      <h1>Créer un nouveau groupe pour le tournoi</h1>

      {/* Formulaire pour ajouter un groupe, aligné sur une ligne */}
      <form className="create-group-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <label>Nom du groupe:</label>
          <input
            type="text"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            required
          />
        </div>

        <div className="form-row">
          <label>Type de round:</label>
          <select
            value={roundType}
            onChange={(e) => setRoundType(e.target.value)}
          >
            <option value="1st round">1er Tour</option>
            <option value="2nd round">2e Tour</option>
            <option value="final round">Tour Final</option>
          </select>
        </div>

        {/* Nouveau champ pour sélectionner le type de groupe */}
        <div className="form-row">
          <label>Type de groupe:</label>
          <select
            value={groupType}
            onChange={(e) => setGroupType(e.target.value)}
          >
            <option value="mix">Mixte</option>
            <option value="women">Femmes</option>
            <option value="men">Hommes</option>
            <option value="team">Équipe</option>
          </select>
        </div>

        <div className="form-row">
          <label>Position la plus élevée (facultatif):</label>
          <input
            type="number"
            value={highestPosition || ''} // Assurez-vous que le champ est vide s'il n'y a pas de valeur
            onChange={(e) => setHighestPosition(e.target.value)}
          />
        </div>

        <button type="submit">Créer le groupe</button>
      </form>

      {/* Affichage des messages de succès ou d'erreur */}
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {success && <div style={{ color: 'green' }}>{success}</div>}

      <h2>Groupes existants</h2>

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

      {/* Affichage des groupes filtrés */}
      {filteredGroups.length > 0 ? (
        filteredGroups.map(group => (
          <div key={group.id}>
            <h3>{group.name} - {group.group_type}</h3>
            {renderPlayerTable(group.id)}
          </div>
        ))
      ) : (
        <p>Aucun groupe trouvé pour le tour sélectionné.</p>
      )}
    </div>
  );
};

export default GroupsEdit;
