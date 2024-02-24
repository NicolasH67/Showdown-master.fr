import { Outlet, RouterProvider, createBrowserRouter, NavLink} from "react-router-dom"
import './Style/root.css'
import './Style/app.css'

const router = createBrowserRouter([
  {
    path: "/", 
    element: <Root />,
    errorElement: <div>une erreur</div>, 
    children: [
      {
        path: '', 
        element: <div>Home</div>
      }, 
      {
        path: 'history', 
        element: <div className="history">c'est l'historique des tournois</div>
      }, 
      {
        path: 'create', 
        element: <div className="create">Créer une nouveau tournoi</div>
      }, 
      {
        path: 'contact', 
        element: <div className="contact">Formulaire de contact</div>
      }
    ]
  }
])

function Root() {
  return <>
  <header>
    <h1>Showdown<br />Master</h1>
    <nav>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/history">history</NavLink>
      <NavLink to="/create">Create new Tournament</NavLink>
      <NavLink to="/contact">Contact</NavLink>
    </nav>
  </header>
  <div>
    <Outlet />
  </div>
  </>
}

function App() {
  return <RouterProvider router={router} />
}

export default App
