import { Link } from 'react-router-dom';
import '../Style/Componants/Tournament.css'

function Tournament(props) {
    let teamValue = "";
    if (props.team === false) {
        teamValue = "No";
    } else {
        teamValue = "Yes";
    }
    return (
        <Link to={`/tournament/${props.id}`} className="tournament-link">
            <div className="tournament">
            <h2 className="tournament-title">{props.title}</h2>
            <p className="tournament-day">{props.startDay} to {props.endDay}</p>
            <p className="tournament-p"><strong>Women:</strong> {props.women}</p>
            <p className="tournament-p"><strong>Men:</strong> {props.men}</p>
            <p className="tournament-p"><strong>Team:</strong> {teamValue}</p>
        </div>
        </Link>
    );
}

export default Tournament;
