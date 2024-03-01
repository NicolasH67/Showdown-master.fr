import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Root from "./Pages/Root"
import Home from "./Pages/Home"
import History from "./Pages/History"
import CreateTournament from "./Pages/CreateTournament"
import ContactForm from "./Pages/Contact"
import Tournament from "./Pages/Tournament"
import Detail from "./Componants/Detail"
import PlayerList from "./Pages/PlayerList"

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
        path: 'tournament/create', 
        element: <CreateTournament />
      },
      {
        path: 'tournament',
        element: <Tournament />,
        children: [ 
          {
            path: ':id',
            element: <Detail />
          }, 
          {
            path: ':id/player', 
            element: <PlayerList />
          }
        ]
      },
      {
        path: 'contact', 
        element: <ContactForm />
      }
    ]
  }
])

function App() {
  return <RouterProvider router={router} />
}

export default App
