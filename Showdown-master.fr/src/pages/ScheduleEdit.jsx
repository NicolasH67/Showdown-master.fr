import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import supabase from "../supabaseClient";
import "./Groups.css";
import matchOrder from "../assets/matchOrder.json";

const ScheduleEdit = () => {
  const { id } = useParams();
  const [groups, setGroups] = useState([]);
  const [players, setPlayers] = useState({});
  const [matches, setMatches] = useState({});
  const [clubs, setClubs] = useState({}); // Stocker les abréviations des clubs
  const [generatedMatches, setGeneratedMatches] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRound, setSelectedRound] = useState("1st round");

  useEffect(() => {
    if (!id) {
      console.error("Tournament ID is not defined!");
      return;
    }

    const fetchData = async () => {
      try {
        // Récupération des divisions
        const { data: divisions, error: divisionsError } = await supabase
          .from("division")
          .select("id, name, round_type, group_type, tournament_id");

        if (divisionsError) throw divisionsError;

        // Récupération des joueurs avec l'ID de leur club
        const { data: playersData, error: playersError } = await supabase
          .from("player")
          .select(
            "id, firstname, lastname, division_id, tournament_id, club_id"
          );

        if (playersError) throw playersError;

        // Récupération des clubs avec leurs abréviations
        const { data: clubsData, error: clubsError } = await supabase
          .from("club")
          .select("id, abbreviation");

        if (clubsError) throw clubsError;

        // Création d'un dictionnaire des abréviations de clubs
        const clubsMap = {};
        clubsData.forEach((club) => {
          clubsMap[club.id] = club.abbreviation;
        });

        // Organisation des joueurs par division
        const playersByDivision = {};
        playersData.forEach((player) => {
          if (!playersByDivision[player.division_id]) {
            playersByDivision[player.division_id] = [];
          }
          playersByDivision[player.division_id].push(player);
        });

        // Récupération des matchs
        const { data: matchesData, error: matchesError } = await supabase
          .from("match")
          .select("*")
          .eq("tournament_id", id);

        if (matchesError) throw matchesError;

        // Organisation des matchs par division
        const matchesByDivision = {};
        matchesData.forEach((match) => {
          if (!matchesByDivision[match.division_id]) {
            matchesByDivision[match.division_id] = [];
          }
          matchesByDivision[match.division_id].push(match);
        });

        // Mise à jour des états
        setGroups(
          divisions.filter((g) => g.tournament_id === parseInt(id, 10))
        );
        setPlayers(playersByDivision);
        setMatches(matchesByDivision);
        setClubs(clubsMap); // Stocker les abréviations des clubs
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const filteredGroups = groups.filter(
    (group) => group.round_type === selectedRound
  );

  return (
    <div>
      <h1>Groupes du tournoi</h1>

      <div className="round-selector">
        <button onClick={() => setSelectedRound("1st round")}>1er Tour</button>
        <button onClick={() => setSelectedRound("2nd round")}>2e Tour</button>
        <button onClick={() => setSelectedRound("final round")}>
          Tour Final
        </button>
      </div>

      {filteredGroups.length > 0 ? (
        <section>
          {filteredGroups.map((group) => (
            <div key={group.id}>
              <h3>
                {group.name} - {group.group_type}
              </h3>

              <table>
                <thead>
                  <tr>
                    <th>Place</th>
                    <th>Nom du joueur</th>
                  </tr>
                </thead>
                <tbody>
                  {players[group.id]?.length > 0 ? (
                    players[group.id].map((player, index) => {
                      // Récupération de l'abréviation du club du joueur
                      const clubAbbreviation = clubs[player.club_id] || "N/A";
                      return (
                        <tr key={player.id}>
                          <td>{index + 1}</td>
                          <td>
                            {player.firstname} {player.lastname} (
                            {clubAbbreviation})
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="2">Aucun joueur trouvé</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          ))}
        </section>
      ) : (
        <div>Aucun groupe trouvé.</div>
      )}
    </div>
  );
};

export default ScheduleEdit;
