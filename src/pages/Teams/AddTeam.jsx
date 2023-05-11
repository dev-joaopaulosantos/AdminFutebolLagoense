import api from '../../utils/api'
import { useNavigate } from 'react-router-dom'

// Custom hooks
import useFlashMessage from '../../hooks/useFlashMessage'
import { useState } from 'react'
import TeamForm from '../../components/Forms/TeamForm'

const AddTeam = () => {
   const [token] = useState(localStorage.getItem('Authtoken') || '')
   const { setFlashMessage } = useFlashMessage()
   const [isLoading, setIsLoading] = useState(false) // Estado para indicar se está carregando
   const navigateTo = useNavigate()

   if (!token) {
      navigateTo('/login')
   }

   const registerTeam = async (team) => {
      let msgType = 'success'
      setIsLoading(true) // Ativar indicador de carregamento

      const data = await api.post('/api/teams', team, {
         headers: {
            Authorization: `Bearer ${JSON.parse(token)}`,
         },
      }).then((response) => {
         return response.data

      }).catch((err) => {
         msgType = 'error'
         return err.response.data
      }).finally(() => {
         setIsLoading(false) // Desativar indicador de carregamento
      })

      setFlashMessage(data.message, msgType)
      if (msgType !== 'error') {
         navigateTo('/teams')
      }
   }

   return (
      <section>
         <div className='addteam-header'>
            <h1>Cadastrar Equipe</h1>
         </div>
         <TeamForm
            handleSubmit={registerTeam}
            btnText="Cadastrar"
            isLoading={isLoading}
         />
      </section>
   )
}

export default AddTeam