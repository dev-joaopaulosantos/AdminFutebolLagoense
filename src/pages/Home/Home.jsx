import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../../utils/api'
import '../DashboardGlobal.css'
import './Home.css'
import useFlashMessage from '../../hooks/useFlashMessage'

import getYear from '../../utils/getYear'
import LoadingPage from '../LoadingPage/LoadingPage'

const Home = () => {
   const [championships, setChampionships] = useState([])
   const [token] = useState(localStorage.getItem('Authtoken') || '')
   const { setFlashMessage } = useFlashMessage()

   const [selectedChampionshipId, setSelectedChampionshipId] = useState(
      localStorage.getItem('selectedChampionshipId') || null
   );

   useEffect(() => {
      api.get('/api/championships').then((response) => {
         setChampionships(response.data.championships)
      })
   }, [])

   useEffect(() => {
      localStorage.setItem('selectedChampionshipId', selectedChampionshipId);
   }, [selectedChampionshipId])

   const removeChampionship = async (id) => {
      let msgType = 'success'

      const data = await api.delete(`/api/championships/${id}`, {
         headers: {
            Authorization: `Bearer ${JSON.parse(token)}`
         }
      }).then((response) => {
         const updatedChampionships = championships.filter((championship) => championship._id !== id)
         setChampionships(updatedChampionships)
         return response.data
      }).catch((err) => {
         msgType = 'error'
         return err.response.data
      });

      setFlashMessage(data.message, msgType)
   }

   const handleSelectChampionship = (championshipId) => {
      setSelectedChampionshipId(championshipId);
   }

   return (
      <div className='dashboard-container'>
         {championships.length > 0 && (
            championships.map((championship) => (
               <div
                  className={`dashboard-row ${selectedChampionshipId === championship._id ? 'selected' : ''
                     }`}
                  key={championship._id}
               >
                  <div className='dashboard-infos'>
                     <h3>{championship.name}</h3>
                     <p>
                        <span className='bold'>Ano: </span>
                        {getYear(championship.year)}
                     </p>
                     <p className='info'>
                        Fase de grupos:{' '}
                        {championship.groupStage ? (
                           <span className='text-success'>Sim</span>
                        ) : (
                           <span className='text-danger'>Não</span>
                        )}
                     </p>
                  </div>
                  <div className='actions'>
                     <button className='select-button'onClick={() => handleSelectChampionship(championship._id)}>Selecionar</button>
                     <Link to={`/edit/championship/${championship._id}`}>Editar</Link>
                     <button className='danger' onClick={() => { removeChampionship(championship._id) }}>Excluir</button>
                  </div>
               </div>
            ))
         )}
         {championships.length === 0 && (
            <LoadingPage />
         )}
      </div>
   );
}

export default Home