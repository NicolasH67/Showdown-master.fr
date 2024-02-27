import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Root from "./Pages/Root"
import Home from "./Pages/Home"
import History from "./Pages/History"
import CreateTournament from "./Pages/CreateTournament"
import ContactForm from "./Pages/Contact"

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
        path: 'tournament',
        children: [
          {
            path: 'create', 
            element: <CreateTournament />
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
