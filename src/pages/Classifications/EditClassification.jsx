import api from '../../utils/api'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useFlashMessage from '../../hooks/useFlashMessage'
import ClassificationForm from '../../components/Forms/ClassificationForm'
import LoadingPage from '../LoadingPage/LoadingPage'

const EditClassification = () => {
    const [classification, setClassification] = useState(null)
    const [token] = useState(localStorage.getItem('Authtoken') || '')
    const { setFlashMessage } = useFlashMessage()
    const [isLoading, setIsLoading] = useState(false) // Estado para indicar se está carregando
    const navigateTo = useNavigate()
    const { id } = useParams()

    if (!token) {
        navigateTo('/login')
    }

    useEffect(() => {
        api.get(`/api/oneclassification/${id}`).then((response) => {
            setClassification(response.data.classification)
        });

    }, [token, id]);

    const updateClassification = async (classification) => {
        let msgType = 'success'
        setIsLoading(true) // Ativar indicador de carregamento

        const data = await api.put(`/api/classification/${classification._id}`, classification, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
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
            <div>
                <h1>Editando:</h1>
            </div>
            {classification && (
                <ClassificationForm
                    handleSubmit={updateClassification}
                    classificationData={classification}
                    isLoading={isLoading}
                    btnText="Atualizar"
                />
            )}
            {!classification && (
                <LoadingPage />
            )}
        </section>
    )
}

export default EditClassification