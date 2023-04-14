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


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/add/championship",
        element: <AddChampionship />
      }
    ]
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>,
)
