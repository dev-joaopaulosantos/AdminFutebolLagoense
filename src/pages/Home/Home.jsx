import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Home.css'

const Home = () => {
  const [championships, setChampionships] = useState([])

  return (
    <div className='home'>
      <h1>Campeonatos Cadastrados</h1>
      <Link to='add/championship'>Cadastrar Campeonato</Link>
    </div>
  )
}

export default Home