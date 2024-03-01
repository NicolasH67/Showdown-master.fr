import { Outlet } from "react-router-dom"
import Aside from "../Componants/Aside"
import '../Style/Pages/Tournament.css'

function Tournament() {
    return <div className="tournamentPage">
        <Aside />
        <section>
            <Outlet />
        </section>
    </div>
}

export default Tournament