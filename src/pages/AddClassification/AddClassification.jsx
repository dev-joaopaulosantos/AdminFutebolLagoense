import api from '../../utils/api'
import { useNavigate } from 'react-router-dom'

// Custom hooks
import useFlashMessage from '../../hooks/useFlashMessage'
import { useState } from 'react'
import TeamForm from '../../components/Form/TeamForm'
import ClassificationForm from '../../components/Form/ClassificationForm'

const AddClassification = () => {

    const [token] = useState(localStorage.getItem('Authtoken') || '')
    const { setFlashMessage } = useFlashMessage()
    const navigateTo = useNavigate()

    const registerClassification = async (classification) => {
        let msgType = 'success'

        const data = await api.post('/api/classification', classification, {
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
            navigateTo('/classifications')
        }
    }

    return (
        <section>
        <div className='addteam-header'>
           <h1>Cadastrar Classificação</h1>
        </div>
        <ClassificationForm handleSubmit={registerClassification} btnText="Cadastrar" />
     </section>
    )
}

export default AddClassification