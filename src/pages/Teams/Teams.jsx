import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../../utils/api'
import '../DashboardGlobal.css'
import useFlashMessage from '../../hooks/useFlashMessage'
import LoadingPage from '../LoadingPage/LoadingPage'

const Teams = () => {
   const [teams, setTeams] = useState(null)
   const [token] = useState(localStorage.getItem('Authtoken') || '')
   const { setFlashMessage } = useFlashMessage()

   useEffect(() => {

      api.get('/api/teams').then((response) => {
         setTeams(response.data.teams)
      })

   }, [])

   const removeTeam = async (id) => {
      let msgType = 'success'

      const data = await api.delete(`/api/teams/${id}`, {
         headers: {
            Authorization: `Bearer ${JSON.parse(token)}`
         }
      }).then((response) => {
         const updatedteams = teams.filter((team) => team._id !== id)
         setTeams(updatedteams)
         return response.data

      }).catch((err) => {
         msgType = 'error'
         return err.response.data
      });

      setFlashMessage(data.message, msgType)
   }

   return (
      <section className='section-container'>
         <div className='dashboard-header'>
            <h1>Equipes Cadastradas</h1>
            <Link to='/add/team'>Cadastrar Equipe</Link>
         </div>
         <div className='dashboard-container'>
            {teams && teams.length > 0 && (
               teams.map((team) => (
                  <div className='dashboard-row' key={team._id}>
                     <div className='dashboard-infos'>
                        <h3>{team.name}</h3>
                        <p><span>Escudo: </span><img src={team.shield} alt={team.name} /></p>
                     </div>
                     <div className='actions'>
                        <Link to={`/edit/team/${team._id}`}>Editar</Link>
                        <button className='danger' onClick={() => { removeTeam(team._id) }}>Excluir</button>
                     </div>
                  </div>
               ))
            )}
            {teams && teams.length === 0 && (
               <h1>Ainda não há jogos cadastrados na base de dados!</h1>
            )}
            {!teams && (
               <LoadingPage />
            )}
         </div>
      </section>
   )
}

export default Teams