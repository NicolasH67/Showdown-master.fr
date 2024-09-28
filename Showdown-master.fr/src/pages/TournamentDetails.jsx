import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import supabase from '../supabaseClient';

const TournamentDetails = () => {
  const { id } = useParams();  // Récupère l'id du tournoi depuis l'URL
  const [tournament, setTournament] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTournamentDetails = async () => {
      try {
        const { data, error } = await supabase
          .from('tournament')
          .select('*')
          .eq('id', id)  // Filtre pour obtenir le tournoi correspondant à l'id
          .single();     // Récupère un seul élément

        if (error) {
          console.error('Erreur lors de la récupération du tournoi:', error);
        } else {
          setTournament(data);  // Stocke les détails du tournoi dans le state
        }
      } catch (err) {
        console.error('Erreur lors de la connexion à Supabase:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTournamentDetails();
  }, [id]);

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (!tournament) {
    return <div>Tournoi non trouvé.</div>;
  }

  return (
    <div>
      <h1>Détails du tournoi : {tournament.title}</h1>
      <p><strong>Date de début :</strong> {new Date(tournament.startDay).toLocaleDateString()}</p>
      <p><strong>Date de fin :</strong> {new Date(tournament.endDate).toLocaleDateString()}</p>
      <p><strong>Localisation :</strong> {tournament.location}</p>
      <p><strong>Nombre de tables :</strong> {tournament.table_count}</p>
      <p><strong>Durée des matchs :</strong> {tournament.match_duration} minutes</p>
      {/* Ajoute plus de détails si nécessaire */}
    </div>
  );
};

export default TournamentDetails;
