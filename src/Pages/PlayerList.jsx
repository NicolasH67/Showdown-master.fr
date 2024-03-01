import '../Style/Pages/PlayersTable.css'
import Tbody from "../Componants/Tbody";

const PLAYERTEST = [
    { key: 1, name: "HECKER Nicolas", city: "Strasbourg" },
    { key: 2, name: "GUITOUNE Madjid", city: "Paris" },
    { key: 3, name: "BERTHIAU Didier", city: "Rouen" },
    { key: 4, name: "SAHRAHOUI Muhammed", city: "Caen" },
    { key: 5, name: "MILARET Yohann", city: "Toulouse" },
    { key: 6, name: "BLANC Mathias", city: "Toulouse" }
];

function PlayerList() {
    return <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Country/City</th>
              </tr>
            </thead>
            <tbody>
                {PLAYERTEST.map((player) => (
                    <Tbody key={player.key} name={player.name} city={player.city} />
                ))}
            </tbody>
          </table>
        </div>
}

export default PlayerList;
