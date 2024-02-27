import CreateNewTournamentForm from "../Componants/CreateNewTournamentForm";
import '../Style/Pages/CreateTournament.css'

function CreateTournament() {
    return <div className='CreateTournament'>
        <h2 className="CreateTournamentTitle">New tournament</h2>
        <p className="CreateTournamentInfo">Les champs qui possède une * sont obligatoire</p>
        <CreateNewTournamentForm />
    </div>
};

export default CreateTournament;