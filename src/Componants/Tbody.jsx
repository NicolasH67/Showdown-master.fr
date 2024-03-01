import '../Style/Pages/PlayersTable.css'
import { NavLink } from "react-router-dom";

function Tbody({ key, name, city }) {
    console.log(key)
    return (
        <tr key={key} className="playersTbodyTr">
            <NavLink to={`/tournament/1/player/${key}`}><td className="playersTbodyTrTh">{name}</td></NavLink>
            <td className="playersTbodyTrTh">{city}</td>
        </tr>
    );
}

export default Tbody;
