import React, { useState, useEffect } from "react";
import supabase from "../supabaseClient";
import { useParams } from "react-router-dom";

const PlayersEdit = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [divisionId, setDivisionId] = useState("");
  const [divisions, setDivisions] = useState([]);
  const [clubName, setClubName] = useState(""); // Nom du club
  const [clubAbbreviation, setClubAbbreviation] = useState(""); // Abréviation du club
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const { id } = useParams();

  const [formType, setFormType] = useState("player"); // Initialiser à "player" pour afficher le formulaire de joueur par défaut

  useEffect(() => {
    const fetchDivisions = async () => {
      try {
        const { data, error } = await supabase
          .from("division")
          .select("id, name, tournament_id, round_type, group_type");

        if (error) throw error;

        const filteredByTournament = data.filter(
          (division) => division.tournament_id === Number(id)
        );
        const filteredByRound = filteredByTournament.filter(
          (division) => division.round_type === "1st round"
        );

        setDivisions(filteredByRound);
      } catch (error) {
        console.error("Erreur lors de la récupération des divisions:", error);
      }
    };

    if (id) {
      fetchDivisions();
    }
  }, [id]);

  // Soumission pour les joueurs
  const handlePlayerSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase.from("player").insert([
        {
          firstname,
          lastname,
          division_id: divisionId,
          tournament_id: id,
        },
      ]);
      if (error) throw error;

      setSuccess("Le joueur a été ajouté avec succès !");
      setFirstname("");
      setLastname("");
      setDivisionId("");
      setError(null);
    } catch (error) {
      console.error("Erreur lors de l’ajout:", error);
      setError(error.message);
    }
  };

  // Soumission pour les arbitres
  const handleRefereeSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase.from("referee").insert([
        {
          firstname,
          lastname,
          tournament_id: id,
        },
      ]);
      if (error) throw error;

      setSuccess("L’arbitre a été ajouté avec succès !");
      setFirstname("");
      setLastname("");
      setError(null);
    } catch (error) {
      console.error("Erreur lors de l’ajout:", error);
      setError(error.message);
    }
  };

  // Soumission pour les clubs
  const handleClubSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase.from("club").insert([
        {
          name: clubName,
          abbreviation: clubAbbreviation,
        },
      ]);
      if (error) throw error;

      setSuccess("Le club a été ajouté avec succès !");
      setClubName("");
      setClubAbbreviation("");
      setError(null);
    } catch (error) {
      console.error("Erreur lors de l’ajout:", error);
      setError(error.message);
    }
  };

  return (
    <div>
      <h1>Ajouter une entité</h1>

      {/* Trois boutons pour afficher chaque formulaire */}
      <div className="round-selector">
        <button onClick={() => setFormType("club")}>Créer un Club</button>
        <button onClick={() => setFormType("player")}>Créer un Joueur</button>
        <button onClick={() => setFormType("referee")}>Créer un Arbitre</button>
      </div>

      {/* Affichage conditionnel des formulaires */}
      {formType === "club" && (
        <div>
          <h2>Ajouter un Club</h2>
          <form onSubmit={handleClubSubmit}>
            <div>
              <label>Nom du club:</label>
              <input
                type="text"
                value={clubName}
                onChange={(e) => setClubName(e.target.value)}
                required
              />
            </div>

            <div>
              <label>Abbreviation du club:</label>
              <input
                type="text"
                value={clubAbbreviation}
                onChange={(e) => setClubAbbreviation(e.target.value)}
                required
              />
            </div>

            <button type="submit">Ajouter le Club</button>
          </form>
        </div>
      )}

      {formType === "player" && (
        <div>
          <h2>Ajouter un Joueur</h2>
          <form onSubmit={handlePlayerSubmit}>
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

            <button type="submit">Ajouter le Joueur</button>
          </form>
        </div>
      )}

      {formType === "referee" && (
        <div>
          <h2>Ajouter un Arbitre</h2>
          <form onSubmit={handleRefereeSubmit}>
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

            <button type="submit">Ajouter l'Arbitre</button>
          </form>
        </div>
      )}

      {/* Affichage des erreurs ou du succès */}
      {error && <div style={{ color: "red" }}>{error}</div>}
      {success && <div style={{ color: "green" }}>{success}</div>}
    </div>
  );
};

export default PlayersEdit;
