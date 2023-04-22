import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
const token = localStorage.getItem('authtoken')
import './index.css'

// configurando router
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'

// importando pages
import Championship from './pages/Championship/Championship'
import Login from './pages/Login/Login'
import AddChampionship from './pages/Championship/AddChampionship'
import EditChampionship from './pages/Championship/EditChampionship'
import App from './App'
import Teams from './pages/Teams/Teams'
import AddTeam from './pages/Teams/AddTeam'
import EditTeam from './pages/Teams/EditTeam'
import Classifications from './pages/Classifications/Classifications'
import AddClassification from './pages/Classifications/AddClassification'
import EditClassification from './pages/Classifications/EditClassification'
import Games from './pages/Games/Games'
import AddGame from './pages/Games/AddGame'
import EditGame from './pages/Games/EditGame'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Championship /> },
      { path: "/login", element: <Login /> },
      { path: "/add/championship", element: <AddChampionship />,  },
      { path: "/edit/championship/:id", element: <EditChampionship /> },
      { path: "/teams", element: <Teams /> },
      { path: "/add/team", element: <AddTeam /> },
      { path: "/edit/team/:id", element: <EditTeam /> },
      { path: "/classifications", element: <Classifications /> },
      { path: "/add/classification", element: <AddClassification /> },
      { path: "/edit/classification/:id", element: <EditClassification /> },
      { path: "/games", element: <Games /> },
      { path: "/add/game", element: <AddGame /> },
      { path: "/edit/game/:id", element: <EditGame /> },
    ]
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
