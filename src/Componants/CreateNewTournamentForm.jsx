import React, { useState } from 'react';
import '../Style/Componants/CreateNewTournament.css'

function CreateNewTournamentForm() {
    const [tournamentName, setTournamentName] = useState('');
    const [email, setEmail] = useState('');
    const [passwordAdmin, setPasswordAdmin] = useState('');
    const [passwordUser, setPasswordUser] = useState('');
    const [startDay, setStartDay] = useState('');
    const [endDay, setEndDay] = useState('');
    const [numberOfTables, setNumberOfTables] = useState('4');
    const [matchDuration, setMatchDuration] = useState('25');
    const [location, setLocation] = useState('');
    const [passwordShowdown, setPasswordShowdown] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Vous pouvez mettre ici la logique pour soumettre les données du tournoi
        console.log("Formulaire soumis avec succès !");
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="tournamentName">*Tournament Name :</label>
                <input type="text" id="tournamentName" value={tournamentName} onChange={(e) => setTournamentName(e.target.value)} required />
            </div>
            <div>
                <label htmlFor="email">*Email:</label>
                <input type="email" id="email" pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div>
                <label htmlFor="passwordAdmin">*Password Admin:</label>
                <input type="password" id="passwordAdmin" value={passwordAdmin} onChange={(e) => setPasswordAdmin(e.target.value)} required />
            </div>
            <div>
                <label htmlFor="passwordUser">Password User:</label>
                <input type="password" id="passwordUser" value={passwordUser} onChange={(e) => setPasswordUser(e.target.value)} />
            </div>
            <div>
                <label htmlFor="startDay">*Start Day:</label>
                <input type="date" id="startDay" value={startDay} onChange={(e) => setStartDay(e.target.value)} required />
            </div>
            <div>
                <label htmlFor="endDay">*End Day:</label>
                <input type="date" id="endDay" value={endDay} onChange={(e) => setEndDay(e.target.value)} required />
            </div>
            <div>
                <label htmlFor="numberOfTables">*Number of Tables:</label>
                <input type="number" id="numberOfTables" value={numberOfTables} onChange={(e) => setNumberOfTables(e.target.value)} required />
            </div>
            <div>
                <label htmlFor="matchDuration">*Match Duration (in Min):</label>
                <input type="number" id="matchDuration" value={matchDuration} onChange={(e) => setMatchDuration(e.target.value)} required />
            </div>
            <div>
                <label htmlFor="location">Location:</label>
                <input type="text" id="location" value={location} onChange={(e) => setLocation(e.target.value)} />
            </div>
            <div>
                <label htmlFor="passwordShowdown">Password Showdown-Master-Referee:</label>
                <input type="password" id="passwordShowdown" value={passwordShowdown} onChange={(e) => setPasswordShowdown(e.target.value)} />
            </div>
            <button type="submit">Create Tournament</button>
        </form>
    );
}

export default CreateNewTournamentForm;
