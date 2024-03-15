import Tournament from "../Componants/Tournament";
import '../Style/Pages/Home.css'

const TEST = [
    { id: "1", title: "Championnat de France D2", startDay: "01/01/2022", endDate: "05/01/2022", women: 16, men: 16, team: false },
    { id: "2", title: "Tournoi Open de Tennis", startDay: "10/02/2022", endDate: "15/02/2022", women: 32, men: 32, team: false },
    { id: "3", title: "Championnat d'Europe de Football", startDay: "20/06/2022", endDate: "10/07/2022", women: 0, men: 24, team: true },
    { id: "4", title: "Jeux Olympiques", startDay: "23/07/2022", endDate: "08/08/2022", women: 50, men: 50, team: true },
    { id: "5", title: "Tournoi de Golf Masters", startDay: "05/04/2022", endDate: "10/04/2022", women: 0, men: 100, team: false },
    { id: "6", title: "Coupe du Monde de Rugby", startDay: "10/09/2022", endDate: "30/09/2022", women: 20, men: 20, team: true },
    { id: "7", title: "Championnat du Monde de Natation", startDay: "15/07/2022", endDate: "30/07/2022", women: 40, men: 40, team: true },
    { id: "8", title: "Tournoi de Badminton International", startDay: "02/05/2022", endDate: "07/05/2022", women: 64, men: 64, team: false },
    { id: "9", title: "Championnat de Basketball NBA", startDay: "15/10/2022", endDate: "15/04/2023", women: 0, men: 30, team: true },
    { id: "10", title: "Tournoi de Volleyball Beach", startDay: "01/06/2022", endDate: "30/06/2022", women: 32, men: 32, team: false }
];

function Home() {
    return (
        <div className="home">
            {TEST.map((tournament, index) => (
                <Tournament 
                    key={index}
                    id={tournament.id}
                    title={tournament.title}
                    startDay={tournament.startDay}
                    endDay={tournament.endDate}
                    women={tournament.women}
                    men={tournament.men}
                    team={tournament.team}
                />
            ))}
        </div>
    );
}

export default Home;
