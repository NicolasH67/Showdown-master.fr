import React, { useEffect, useState } from "react";
import supabase from "../supabaseClient";
import "./ResultEdit.css"; // Fichier CSS pour le style
import { useParams } from "react-router-dom";

const ResultEdit = () => {
  const { id } = useParams();
  const [matches, setMatches] = useState([]);
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [referees, setReferees] = useState([]);

  useEffect(() => {
    const fetchMatchesAndReferees = async () => {
      try {
        // Récupérer les matchs
        let { data: matchData, error: matchError } = await supabase
          .from("match")
          .select(
            `
            id,
            player1:player1_id(firstname, lastname),
            player2:player2_id(firstname, lastname),
            division:division_id(name),
            match_date,
            match_time, 
            table_number,
            referee_id,
            result
            `
          )
          .eq("tournament_id", id);

        if (matchError) throw matchError;

        // Trier les matchs par date et table
        matchData.sort((a, b) => {
          const dateA = new Date(`${a.match_date}T${a.match_time}`);
          const dateB = new Date(`${b.match_date}T${b.match_time}`);
          if (dateA < dateB) return -1;
          if (dateA > dateB) return 1;
          return a.table_number - b.table_number;
        });

        setMatches(matchData);

        // Récupérer les arbitres assignés au tournoi
        let { data: refereeData, error: refereeError } = await supabase
          .from("referee")
          .select("id, firstname, lastname")
          .eq("tournament_id", id);

        if (refereeError) throw refereeError;

        setReferees(refereeData);
      } catch (err) {
        console.error("Erreur lors de la récupération des données :", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMatchesAndReferees();
  }, [id]);

  const handleMatchChange = (matchId, field, value) => {
    setMatches(
      matches.map((match) =>
        match.id === matchId ? { ...match, [field]: value } : match
      )
    );
  };

  const handleSave = async (matchId) => {
    const matchToSave = matches.find((match) => match.id === matchId);

    const { error } = await supabase
      .from("match")
      .update({
        match_date: matchToSave.match_date,
        match_time: matchToSave.match_time,
        table_number: matchToSave.table_number,
        referee_id: matchToSave.referee?.id || null,
      })
      .eq("id", matchId);

    if (error) {
      console.error("Erreur lors de l'enregistrement du match :", error);
    } else {
      console.log("Match sauvegardé avec succès.");
    }
  };

  const handleResultChange = (matchId, setIndex, player, value) => {
    setResults({
      ...results,
      [matchId]: {
        ...results[matchId],
        [player]: {
          ...results[matchId]?.[player],
          [setIndex]: value,
        },
      },
    });
  };

  const handleResultSubmit = async (matchId) => {
    const resultData = results[matchId];

    if (resultData) {
      const player1Results = resultData.player1
        ? Object.values(resultData.player1)
        : [];
      const player2Results = resultData.player2
        ? Object.values(resultData.player2)
        : [];

      if (player1Results.length > 5 || player2Results.length > 5) {
        console.error(
          "Erreur : Le nombre de sets dépasse la limite autorisée de 5"
        );
        return;
      }

      const resultArray = [];

      for (
        let i = 0;
        i < Math.max(player1Results.length, player2Results.length);
        i++
      ) {
        const player1Set =
          player1Results[i] !== undefined
            ? parseInt(player1Results[i], 10)
            : null;
        const player2Set =
          player2Results[i] !== undefined
            ? parseInt(player2Results[i], 10)
            : null;

        if (player1Set !== null && player2Set !== null) {
          resultArray.push(player1Set, player2Set);
        }
      }

      console.log(
        "Données envoyées pour le match ID",
        matchId,
        ":",
        resultArray
      );

      const { error } = await supabase
        .from("match")
        .update({ result: resultArray })
        .eq("id", matchId);

      if (error) {
        console.error(
          "Erreur lors de l'enregistrement du résultat du match :",
          error
        );
      } else {
        console.log("Résultat du match enregistré avec succès");
      }
    }
  };

  if (loading) {
    return <div>Chargement des matchs...</div>;
  }

  if (error) {
    return (
      <div>Erreur lors de la récupération des matchs : {error.message}</div>
    );
  }

  return (
    <div>
      <h1>Planning des matchs</h1>
      <table>
        <thead>
          <tr>
            <th>N°</th>
            <th>Date</th>
            <th>Heure</th>
            <th>Table</th>
            <th>Groupe</th>
            <th>Joueur</th>
            <th>Résultat</th>
            <th>Arbitre</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {matches.map((match, index) => (
            <React.Fragment key={match.id}>
              <tr>
                <td rowSpan="2">{index + 1}</td>
                <td rowSpan="2">
                  <input
                    type="date"
                    value={match.match_date}
                    onChange={(e) =>
                      handleMatchChange(match.id, "match_date", e.target.value)
                    }
                  />
                </td>
                <td rowSpan="2">
                  <input
                    type="time"
                    value={match.match_time}
                    onChange={(e) =>
                      handleMatchChange(match.id, "match_time", e.target.value)
                    }
                  />
                </td>
                <td rowSpan="2">
                  <input
                    type="number"
                    value={match.table_number}
                    onChange={(e) =>
                      handleMatchChange(
                        match.id,
                        "table_number",
                        e.target.value
                      )
                    }
                    style={{ width: "50px" }}
                  />
                </td>
                <td rowSpan="2">{match.division.name}</td>
                <td>
                  {match.player1.firstname} {match.player1.lastname}
                </td>
                <td>
                  {[...Array(5)].map((_, setIndex) => (
                    <input
                      key={setIndex}
                      type="text"
                      value={
                        results[match.id]?.player1?.[setIndex] !== undefined
                          ? results[match.id]?.player1?.[setIndex]
                          : ""
                      }
                      onChange={(e) =>
                        handleResultChange(
                          match.id,
                          setIndex,
                          "player1",
                          e.target.value
                        )
                      }
                      aria-label={`Set ${setIndex + 1} joueur 1`}
                      style={{ width: "50px", marginRight: "5px" }}
                    />
                  ))}
                </td>
                <td rowSpan="2">
                  <select
                    value={match.referee?.id || ""}
                    onChange={(e) =>
                      handleMatchChange(
                        match.id,
                        "referee",
                        referees.find(
                          (ref) => ref.id === Number(e.target.value)
                        ) || null
                      )
                    }
                  >
                    <option value="">Aucun arbitre</option>
                    {referees.map((referee) => (
                      <option key={referee.id} value={referee.id}>
                        {referee.firstname} {referee.lastname}
                      </option>
                    ))}
                  </select>
                </td>
                <td rowSpan="2">
                  <button
                    onClick={() => {
                      handleSave(match.id);
                      handleResultSubmit(match.id);
                    }}
                  >
                    Enregistrer
                  </button>
                </td>
              </tr>
              <tr>
                <td>
                  {match.player2.firstname} {match.player2.lastname}
                </td>
                <td>
                  {[...Array(5)].map((_, setIndex) => (
                    <input
                      key={setIndex}
                      type="text"
                      value={
                        results[match.id]?.player2?.[setIndex] !== undefined
                          ? results[match.id]?.player2?.[setIndex]
                          : ""
                      }
                      onChange={(e) =>
                        handleResultChange(
                          match.id,
                          setIndex,
                          "player2",
                          e.target.value
                        )
                      }
                      aria-label={`Set ${setIndex + 1} joueur 2`}
                      style={{ width: "50px", marginRight: "5px" }}
                    />
                  ))}
                </td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResultEdit;
