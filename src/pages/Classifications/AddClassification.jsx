import api from '../../utils/api'
import { useNavigate } from 'react-router-dom'

import useFlashMessage from '../../hooks/useFlashMessage'
import { useState } from 'react'
import ClassificationForm from '../../components/Forms/ClassificationForm'

const AddClassification = () => {

    const [token] = useState(localStorage.getItem('Authtoken') || '')
    const { setFlashMessage } = useFlashMessage()
    const navigateTo = useNavigate()
    const [isLoading, setIsLoading] = useState(false) // Estado para indicar se está carregando

    if (!token) {
        navigateTo('/login')
    }

    const registerClassification = async (classification) => {
        let msgType = 'success'
        setIsLoading(true) // Ativar indicador de carregamento

        const data = await api.post('/api/classification', classification, {
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
            navigateTo('/classifications')
        }

    }

    return (
        <section>
            <div className='addteam-header'>
                <h1>Cadastrar Classificação</h1>
            </div>
            <ClassificationForm
                handleSubmit={registerClassification}
                btnText="Cadastrar"
                isLoading={isLoading}
            />
        </section>
    )
}

export default AddClassification