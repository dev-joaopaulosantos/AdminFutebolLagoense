import api from '../../utils/api'
import { useNavigate } from 'react-router-dom'
import ChampionshipForm from '../../components/Forms/ChampionshipForm'

// Custom hooks
import useFlashMessage from '../../hooks/useFlashMessage'
import { useState } from 'react'

const AddChampionship = () => {
   const [token] = useState(localStorage.getItem('Authtoken') || '')
   const { setFlashMessage } = useFlashMessage()
   const navigateTo = useNavigate()

   if(!token){
      navigateTo('/login')
   }

   const registerChampionship = async (championship) => {
      let msgType = 'success'

      const data = await api.post('/api/championships', championship, {
         headers: {
            Authorization: `Bearer ${JSON.parse(token)}`,
         },
      }).then((response) => {
         return response.data

      }).catch((err) => {
         msgType = 'error'
         return err.response.data
      });

      setFlashMessage(data.message, msgType)
      if (msgType !== 'error') {
         navigateTo('/')
      }
   }

   return (
      <section>
         <div className='addchampionship-header'>
            <h1>Cadastrar Campeonato</h1>
         </div>
         <ChampionshipForm handleSubmit={registerChampionship} btnText="Cadastrar" />
      </section>
   )
}

export default AddChampionship