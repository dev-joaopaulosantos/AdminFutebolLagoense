import api from '../../utils/api'
import { useNavigate } from 'react-router-dom'

// Custom hooks
import useFlashMessage from '../../hooks/useFlashMessage'
import { useState } from 'react'
import TeamForm from '../../components/Form/TeamForm'

const AddTeam = () => {
   const [token] = useState(localStorage.getItem('Authtoken') || '')
   const { setFlashMessage } = useFlashMessage()
   const navigateTo = useNavigate()

   const registerTeam = async (team) => {
      let msgType = 'success'

      const data = await api.post('/api/teams', team, {
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
         navigateTo('/teams')
      }
   }

   return (
      <section>
         <div className='addteam-header'>
            <h1>Cadastrar Equipe</h1>
         </div>
         <TeamForm handleSubmit={registerTeam} btnText="Cadastrar" />
      </section>
   )
}

export default AddTeam