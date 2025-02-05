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
        const { data: divisions, error: divisionsError } = await supabase
          .from("division")
          .select("id, name, round_type, group_type, tournament_id");

        if (divisionsError) throw divisionsError;

        const { data: playersData, error: playersError } = await supabase
          .from("player")
          .select("id, firstname, lastname, division_id, tournament_id");

        if (playersError) throw playersError;

        const { data: matchesData, error: matchesError } = await supabase
          .from("match")
          .select("*")
          .eq("tournament_id", id);

        if (matchesError) throw matchesError;

        const playersByDivision = {};
        playersData.forEach((player) => {
          if (!playersByDivision[player.division_id]) {
            playersByDivision[player.division_id] = [];
          }
          playersByDivision[player.division_id].push(player);
        });

        const matchesByDivision = {};
        matchesData.forEach((match) => {
          if (!matchesByDivision[match.division_id]) {
            matchesByDivision[match.division_id] = [];
          }
          matchesByDivision[match.division_id].push(match);
        });

        setGroups(
          divisions.filter((g) => g.tournament_id === parseInt(id, 10))
        );
        setPlayers(playersByDivision);
        setMatches(matchesByDivision);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const generateMatches = (groupId) => {
    const groupPlayers = players[groupId] || [];
    if (groupPlayers.length < 2) {
      alert("Il faut au moins 2 joueurs pour créer des matchs.");
      return;
    }

    const matchOrderForGroup = matchOrder["Match Order"][groupPlayers.length];
    if (!matchOrderForGroup) {
      alert(
        `Aucun ordre de match défini pour un groupe de ${groupPlayers.length} joueurs.`
      );
      return;
    }

    const matchList = matchOrderForGroup.map((matchStr) => {
      const [player1, player2] = matchStr.split("-").map(Number);
      return {
        player1_id: groupPlayers[player1 - 1]?.id,
        player2_id: groupPlayers[player2 - 1]?.id,
        division_id: groupId,
        tournament_id: parseInt(id, 10),
        date: "",
        time: "",
        table: "",
      };
    });

    setGeneratedMatches((prev) => ({ ...prev, [groupId]: matchList }));
  };

  const updateGeneratedMatch = (groupId, matchIndex, field, value) => {
    setGeneratedMatches((prev) => {
      const updatedMatches = [...prev[groupId]];
      updatedMatches[matchIndex][field] = value;
      return { ...prev, [groupId]: updatedMatches };
    });
  };

  const saveMatches = async (groupId) => {
    try {
      const { error } = await supabase
        .from("match")
        .insert(generatedMatches[groupId]);
      if (error) throw error;

      alert("Les matchs ont été enregistrés !");
      setGeneratedMatches((prev) => ({ ...prev, [groupId]: [] }));
      window.location.reload();
    } catch (error) {
      console.error("Erreur lors de l'enregistrement des matchs :", error);
      alert("Une erreur est survenue.");
    }
  };

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
                    players[group.id].map((player, index) => (
                      <tr key={player.id}>
                        <td>{index + 1}</td>
                        <td>
                          {player.firstname} {player.lastname}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="2">Aucun joueur trouvé</td>
                    </tr>
                  )}
                </tbody>
              </table>

              <button onClick={() => generateMatches(group.id)}>
                Générer les matchs
              </button>

              {generatedMatches[group.id]?.length > 0 && (
                <div>
                  <h4>Matchs générés :</h4>
                  <table>
                    <thead>
                      <tr>
                        <th>Joueur 1</th>
                        <th>Joueur 2</th>
                        <th>Date</th>
                        <th>Heure</th>
                        <th>Table</th>
                      </tr>
                    </thead>
                    <tbody>
                      {generatedMatches[group.id].map((match, index) => (
                        <tr key={index}>
                          <td>
                            {players[group.id].find(
                              (p) => p.id === match.player1_id
                            )
                              ? `${
                                  players[group.id].find(
                                    (p) => p.id === match.player1_id
                                  )?.firstname
                                } ${
                                  players[group.id].find(
                                    (p) => p.id === match.player1_id
                                  )?.lastname
                                }`
                              : ""}
                          </td>
                          <td>
                            {players[group.id].find(
                              (p) => p.id === match.player2_id
                            )
                              ? `${
                                  players[group.id].find(
                                    (p) => p.id === match.player2_id
                                  )?.firstname
                                } ${
                                  players[group.id].find(
                                    (p) => p.id === match.player2_id
                                  )?.lastname
                                }`
                              : ""}
                          </td>
                          <td>
                            <input
                              type="date"
                              value={match.date}
                              onChange={(e) =>
                                updateGeneratedMatch(
                                  group.id,
                                  index,
                                  "date",
                                  e.target.value
                                )
                              }
                            />
                          </td>
                          <td>
                            <input
                              type="time"
                              value={match.time}
                              onChange={(e) =>
                                updateGeneratedMatch(
                                  group.id,
                                  index,
                                  "time",
                                  e.target.value
                                )
                              }
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              value={match.table}
                              placeholder="Table"
                              onChange={(e) =>
                                updateGeneratedMatch(
                                  group.id,
                                  index,
                                  "table",
                                  e.target.value
                                )
                              }
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <button onClick={() => saveMatches(group.id)}>
                    Enregistrer les matchs
                  </button>
                </div>
              )}
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
