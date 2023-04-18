import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

// configurando router
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// importando pages
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import App from './App'
import AddChampionship from './pages/AddChampionship/AddChampionship'
import EditChampionship from './pages/EditChampionship/EditChampionship'
import Teams from './pages/Teams/Teams'
import AddTeam from './pages/AddTeam/AddTeam'
import EditTeam from './pages/EditTeam/EditTeam'
import Classifications from './pages/Classifications/Classifications'
import AddClassification from './pages/AddClassification/AddClassification'
import EditClassification from './pages/EditClassification/EditClassification'
import Games from './pages/Games/Games'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/add/championship", element: <AddChampionship /> },
      { path: "/edit/championship/:id", element: <EditChampionship /> },
      { path: "/teams", element: <Teams /> },
      { path: "/add/team", element: <AddTeam /> },
      { path: "/edit/team/:id", element: <EditTeam /> },
      { path: "/classifications", element: <Classifications /> },
      { path: "/add/classification", element: <AddClassification /> },
      { path: "/edit/classification/:id", element: <EditClassification /> },
      { path: "/games", element: <Games /> },
    ]
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
