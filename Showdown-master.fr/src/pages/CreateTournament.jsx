import React, { useState } from 'react';
import supabase from '../supabaseClient';
import { useNavigate } from 'react-router-dom';
import './CreateTournament.css';

const CreateTournament = () => {
  const [title, setTitle] = useState('');
  const [startday, setStartday] = useState('');
  const [endday, setEndday] = useState('');
  const [adminPassword, setAdminPassword] = useState(''); // Utilisé pour l'admin
  const [email, setEmail] = useState(''); // Nouveau champ pour l'email
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Vérification des champs
    if (!title || !startday || !endday || !adminPassword || !email) {
      setError('Tous les champs sont requis, y compris l\'email et le mot de passe');
      return;
    }

    const startDate = new Date(startday);
    const endDate = new Date(endday);

    // Validation de la logique des dates
    if (startDate > endDate) {
      setError('La date de début doit être avant la date de fin');
      return;
    }

    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('L\'email est invalide');
      return;
    }

    setLoading(true);

    try {
      // Insérer les données avec les valeurs par défaut
      const { data, error } = await supabase
        .from('tournament')
        .insert([
          {
            title,
            startday,
            endday,
            user_password: adminPassword, // Mot de passe utilisateur
            admin_password: adminPassword, // Mot de passe admin
            email, // Email
            table_count: 1, // Valeur par défaut pour le nombre de tables
            match_duration: 30, // Valeur par défaut pour la durée du match
          },
        ]);

      if (error) {
        throw error;
      }

      // Rediriger vers la page d'accueil une fois le tournoi créé
      navigate('/');
    } catch (error) {
      console.error('Erreur lors de la création du tournoi:', error);
      setError('Une erreur est survenue lors de la création du tournoi');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Créer un nouveau tournoi</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Nom du tournoi :</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="startday">Date de début :</label>
          <input
            type="date"
            id="startday"
            value={startday}
            onChange={(e) => setStartday(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="endday">Date de fin :</label>
          <input
            type="date"
            id="endday"
            value={endday}
            onChange={(e) => setEndday(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="adminPassword">Mot de passe :</label>
          <input
            type="password"
            id="adminPassword"
            value={adminPassword}
            onChange={(e) => setAdminPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email :</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? 'Création en cours...' : 'Créer le tournoi'}
        </button>
      </form>
    </div>
  );
};

export default CreateTournament;
