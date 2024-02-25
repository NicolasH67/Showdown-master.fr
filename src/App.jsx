import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Root from "./Pages/Root"
import Home from "./Pages/Home"

const router = createBrowserRouter([
  {
    path: "/", 
    element: <Root />,
    errorElement: <div>une erreur</div>, 
    children: [
      {
        path: '', 
        element: <Home />
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

function App() {
  return <RouterProvider router={router} />
}

export default App
