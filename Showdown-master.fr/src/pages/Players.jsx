import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import supabase from "../supabaseClient";
import "./Players.css";

const Players = () => {
  const { id } = useParams(); // ID du tournoi
  console.log("Tournament ID from URL:", id);

  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) {
      console.error("Tournament ID is not defined!");
      return;
    }

    const fetchPlayers = async () => {
      try {
        let { data, error } = await supabase.from("player").select(`
            id, firstname, lastname, tournament_id, 
            division:division_id (id, name, group_type)
          `); // Jointure avec la table division pour récupérer group_type

        if (error) {
          throw error;
        }

        console.log("Données récupérées :", data);

        const parsedTournamentId = parseInt(id, 10);
        console.log("Parsed Tournament ID:", parsedTournamentId);

        // Filtrer les joueurs par tournoi
        const filteredPlayers = data.filter(
          (player) => player.tournament_id === parsedTournamentId
        );
        console.log("Filtered Players:", filteredPlayers);

        setPlayers(filteredPlayers);
      } catch (error) {
        console.error("Erreur lors de la récupération des joueurs :", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayers();
  }, [id]);

  if (loading) {
    return <div>Chargement des joueurs...</div>;
  }

  if (error) {
    return (
      <div>Erreur lors de la récupération des joueurs : {error.message}</div>
    );
  }

  // Trier les joueurs selon leur division.group_type
  const malePlayers = players.filter(
    (player) => player.division.group_type === "men"
  );
  const femalePlayers = players.filter(
    (player) => player.division.group_type === "women"
  );
  const teamPlayers = players.filter(
    (player) => player.division.group_type === "team"
  );
  const mixPlayers = players.filter(
    (player) => player.division.group_type === "mix"
  ); // Si besoin

  return (
    <div>
      <h1>Liste des joueurs</h1>

      {/* Joueurs Masculins */}
      {malePlayers.length > 0 && (
        <>
          <h2>Joueurs Masculins</h2>
          <table>
            <thead>
              <tr>
                <th>Nom et prénom</th>
                <th>Poule</th>
              </tr>
            </thead>
            <tbody>
              {malePlayers.map((player) => (
                <tr key={player.id}>
                  <td>
                    {player.firstname} {player.lastname}
                  </td>
                  <td>{player.division.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {/* Joueuses Féminines */}
      {femalePlayers.length > 0 && (
        <>
          <h2>Joueuses Féminines</h2>
          <table>
            <thead>
              <tr>
                <th>Nom et prénom</th>
                <th>Poule</th>
              </tr>
            </thead>
            <tbody>
              {femalePlayers.map((player) => (
                <tr key={player.id}>
                  <td>
                    {player.firstname} {player.lastname}
                  </td>
                  <td>{player.division.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {/* Équipes */}
      {teamPlayers.length > 0 && (
        <>
          <h2>Équipes</h2>
          <table>
            <thead>
              <tr>
                <th>Nom de l'équipe</th>
                <th>Poule</th>
              </tr>
            </thead>
            <tbody>
              {teamPlayers.map((player) => (
                <tr key={player.id}>
                  <td>
                    {player.firstname} {player.lastname}
                  </td>
                  <td>{player.division.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {/* Joueurs de poules mixtes (optionnel) */}
      {mixPlayers.length > 0 && (
        <>
          <h2>Joueurs Mixtes</h2>
          <table>
            <thead>
              <tr>
                <th>Nom et prénom</th>
                <th>Poule</th>
              </tr>
            </thead>
            <tbody>
              {mixPlayers.map((player) => (
                <tr key={player.id}>
                  <td>
                    {player.firstname} {player.lastname}
                  </td>
                  <td>{player.division.name}</td>
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
