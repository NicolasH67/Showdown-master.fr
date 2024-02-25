import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Root from "./Pages/Root"
import Home from "./Pages/Home"
import History from "./Pages/History"

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
        element: <History />
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
