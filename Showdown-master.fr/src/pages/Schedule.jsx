import React, { useEffect, useState } from 'react';
import supabase from '../supabaseClient';
import './Schedule.css'; // Fichier CSS pour le style
import { useParams } from 'react-router-dom';

const Schedule = () => {
    const { id } = useParams();
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMatches = async () => {
            try {
                // Requête pour récupérer les matchs avec les informations des joueurs, des divisions et des arbitres
                let { data, error } = await supabase
                    .from('match')
                    .select(`
                        id,
                        player1:player1_id(firstname, lastname),
                        player2:player2_id(firstname, lastname),
                        division:division_id(name),
                        best_of,
                        match_date,
                        match_time, 
                        table_number,
                        referee:referee_id(firstname, lastname)  // Inclure les informations de l'arbitre
                    `)
                    .eq('tournament_id', id); // Filtrer par tournamentId

                if (error) {
                    throw error;
                }

                // Trier les matchs par date et heure
                data.sort((a, b) => {
                    const dateA = new Date(`${a.match_date}T${a.match_time}`);
                    const dateB = new Date(`${b.match_date}T${b.match_time}`);
                    return dateA - dateB; // Tri croissant
                });

                setMatches(data);
            } catch (error) {
                console.error('Erreur lors de la récupération des matchs :', error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchMatches();
    }, [id]);

    if (loading) {
        return <div>Chargement des matchs...</div>;
    }

    if (error) {
        return <div>Erreur lors de la récupération des matchs : {error.message}</div>;
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
                        <th>Joueur 1</th>
                        <th>Joueur 2</th>
                        <th>Resultat</th>
                        <th>Arbitre</th>
                    </tr>
                </thead>
                <tbody>
                    {matches.map((match, index) => (
                        <tr key={match.id}>
                            <td>{index + 1}</td>
                            <td>{match.match_date}</td>
                            <td>{new Date(`${match.match_date}T${match.match_time}`)
                                    .toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} {/* Format HH:MM */}</td>
                            <td>{match.table_number}</td>
                            <td>{match.division.name}</td>
                            <td>{match.player1.firstname} {match.player1.lastname}</td>
                            <td>{match.player2.firstname} {match.player2.lastname}</td>
                            <td>11:8; 11:2</td>
                            <td>{match.referee?.firstname} {match.referee?.lastname}</td> {/* Afficher le nom de l'arbitre */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Schedule;