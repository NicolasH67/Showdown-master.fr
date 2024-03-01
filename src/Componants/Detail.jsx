function Detail() {
    const title = "Championnat de France D2";
    const startDay = "01/01/2022";
    const endDay = "05/01/2022";
    const women = 16;
    const men = 16;
    const team = false;
    let teamValue = "";
    if (team === false) {
        teamValue = "No";
    } else {
        teamValue = "Yes";
    }
    return <>
        <h2 className="tournament-title">{title}</h2>
        <p className="tournament-day">{startDay} to {endDay}</p>
        <p className="tournament-p"><strong>Women:</strong> {women}</p>
        <p className="tournament-p"><strong>Men:</strong> {men}</p>
        <p className="tournament-p"><strong>Team:</strong> {teamValue}</p>
    </>
}

export default Detail;