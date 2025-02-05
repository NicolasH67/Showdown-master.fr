import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import supabase from "../supabaseClient";
import "./AdminEdit.css";

const AdminEdit = () => {
  const { id } = useParams();
  const [tournamentData, setTournamentData] = useState({
    title: "",
    startDay: "",
    endDay: "",
    mix: false,
    email: "",
    admin_password: "",
    user_password: "",
    ereferee_password: "",
    table_count: 0,
    match_duration: 0,
    location: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchTournament = async () => {
      const { data, error } = await supabase
        .from("tournament")
        .select("*")
        .eq("id", id);

      if (error) {
        setError("Erreur lors de la récupération des données du tournoi");
        return;
      }

      if (data && data.length > 0) {
        setTournamentData(data[0]); // Accédez au premier élément de l'array
      }
    };

    fetchTournament();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTournamentData({
      ...tournamentData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase
      .from("tournament")
      .update(tournamentData)
      .eq("id", id);

    setLoading(false);

    if (error) {
      setError("Erreur lors de la mise à jour du tournoi");
    } else {
      setSuccessMessage(
        "Les paramètres du tournoi ont été mis à jour avec succès"
      );
    }
  };

  return (
    <div className="admin-tournament-container">
      <h1>Gestion du tournoi</h1>
      {error && <p className="error-message">{error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Titre du tournoi</label>
          <input
            type="text"
            name="title"
            value={tournamentData.title || ""}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Date de début</label>
          <input
            type="date"
            name="startday"
            value={tournamentData.startday || ""}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Date de fin</label>
          <input
            type="date"
            name="endday"
            value={tournamentData.endday || ""}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={tournamentData.email || ""}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Mot de passe admin</label>
          <input
            type="text"
            name="admin_password"
            value={tournamentData.admin_password || ""}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Mot de passe utilisateur</label>
          <input
            type="text"
            name="user_password"
            value={tournamentData.user_password}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Mot de passe arbitre électronique</label>
          <input
            type="text"
            name="ereferee_password"
            value={tournamentData.ereferee_password}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Nombre de tables</label>
          <input
            type="number"
            name="table_count"
            value={tournamentData.table_count || ""}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Durée des matchs (minutes)</label>
          <input
            type="number"
            name="match_duration"
            value={tournamentData.match_duration || ""}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Lieu</label>
          <input
            type="text"
            name="location"
            value={tournamentData.location}
            onChange={handleChange}
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Mise à jour..." : "Mettre à jour le tournoi"}
        </button>
      </form>
    </div>
  );
};

export default AdminEdit;
