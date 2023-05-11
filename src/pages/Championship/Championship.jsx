import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../../utils/api'
import '../Dashboard.css'
import './Championship.css'
import useFlashMessage from '../../hooks/useFlashMessage'


import getYear from '../../utils/getYear'
import LoadingPage from '../LoadingPage/LoadingPage'

const Championship = () => {
   const [championships, setChampionships] = useState()
   const [token] = useState(localStorage.getItem('Authtoken') || '')
   const { setFlashMessage } = useFlashMessage()
   const [selectedChampionship, setSelectedChampionship] = useState('');
   const navigateTo = useNavigate()



   useEffect(() => {
      if(!token){
         navigateTo('/login')
      }

      api.get('/api/championships').then((response) => {
         setChampionships(response.data.championships)
      })

   }, [])

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

   useEffect(() => {
      const savedChampionship = localStorage.getItem('selectedChampionship');
      if (savedChampionship) {
         setSelectedChampionship(JSON.parse(savedChampionship));
      }
   }, []);

   const handleSelectChampionship = (championship) => {
      localStorage.setItem('selectedChampionship', JSON.stringify(championship));
      setSelectedChampionship(championship);
   }

   return (
      <section>
         <div className='dashboard-header'>
            <h1>Campeonatos Cadastrados:</h1>
            <Link to='/add/championship'>Cadastrar Campeonato</Link>
         </div>
         <div className='dashboard-container'>
            {championships && championships.length > 0 && (
               championships.map((championship) => (
                  <div key={championship._id} className={`dashboard-row ${selectedChampionship && selectedChampionship._id === championship._id ? 'selected' : ''}`}>
                     <div className='dashboard-infos'>
                        <h3>{championship.name} {championship.selected ? <span className='info' style={{fontSize: '12px'}}>Atual</span> : ''}</h3>
                        <p><span className='bold'>Ano: </span>{getYear(championship.year)}</p>
                        <p className='info'>Fase de grupos: {championship.groupStage ? <span className='text-success'>Sim</span> : <span className='text-danger'>Não</span>}</p>
                     </div>
                     <div className='actions'>
                        <button className='select-button' onClick={() => handleSelectChampionship(championship)}>Selecionar</button>
                        <Link to={`/edit/championship/${championship._id}`}>Editar</Link>
                        <button className='danger' onClick={() => { removeChampionship(championship._id) }}>Excluir</button>
                     </div>
                  </div>
               ))
            )}
            {championships && championships.length === 0 && (
               <h1>Ainda não há campeonatos cadastrados na base de dados!</h1>
            )}
            {!championships && (
               <LoadingPage />
            )}
         </div>
      </section>
   );
}

export default Championship
