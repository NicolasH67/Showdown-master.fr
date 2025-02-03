import React, { useState, useEffect } from 'react';
import supabase from '../supabaseClient';
import { useParams } from 'react-router-dom';

const PlayersEdit = () => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [divisionId, setDivisionId] = useState('');
  const [divisions, setDivisions] = useState([]);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const { id } = useParams();

  // Récupération des divisions
  useEffect(() => {
    const fetchDivisions = async () => {
      try {
        const { data, error } = await supabase
          .from('division')
          .select('id, name, tournament_id, round_type, group_type'); // Assure-toi d'inclure tournament_id et round_type
  
        if (error) throw error;
  
        console.log(data)

        const filteredByTournament = data.filter(division => division.tournament_id === Number(id));
        console.log(filteredByTournament)
  
        const filteredByRound = filteredByTournament.filter(division => division.round_type === "1st round")
        console.log("Divisions après filtrage :", filteredByRound); // Debug
  
        setDivisions(filteredByRound);
      } catch (error) {
        console.error('Erreur lors de la récupération des divisions:', error);
      }
    };
  
    if (id) {
      fetchDivisions();
    }
  }, [id]);

  // Gestion de la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data, error } = await supabase
        .from('player')
        .insert([
          {
            firstname,
            lastname,
            division_id: divisionId,
            tournament_id: id
          }
        ]);

      if (error) throw error;

      setSuccess("Le joueur a été ajouté avec succès !");
      setFirstname('');
      setLastname('');
      setDivisionId('');
      setError(null);
    } catch (error) {
      console.error('Erreur lors de l’ajout du joueur :', error);
      setError(error.message);
    }
  };

  return (
    <div>
      <h1>Ajouter un joueur</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Prénom:</label>
          <input
            type="text"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Nom:</label>
          <input
            type="text"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Première division:</label>
          <select
            value={divisionId}
            onChange={(e) => setDivisionId(e.target.value)}
            required
          >
            <option value="">Sélectionner une division</option>
            {divisions.map((division) => (
              <option key={division.id} value={division.id}>
                {division.name} - {division.group_type}
              </option>
            ))}
          </select>
        </div>

        <button type="submit">Ajouter le joueur</button>
      </form>

      {error && <div style={{ color: 'red' }}>{error}</div>}
      {success && <div style={{ color: 'green' }}>{success}</div>}
    </div>
  );
};

export default PlayersEdit;