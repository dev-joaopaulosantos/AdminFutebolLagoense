import api from '../../utils/api'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useFlashMessage from '../../hooks/useFlashMessage'
import ChampionshipForm from '../../components/Forms/ChampionshipForm'
import LoadingPage from '../LoadingPage/LoadingPage'

const EditChampionship = () => {
    const [championship, setChampionship] = useState({})
    const [token] = useState(localStorage.getItem('Authtoken') || '')
    const { setFlashMessage } = useFlashMessage()
    const [isLoading, setIsLoading] = useState(false) // Estado para indicar se está carregando
    const navigateTo = useNavigate()
    const { id } = useParams()

    if (!token) {
        navigateTo('/login')
    }

    useEffect(() => {
        api.get(`/api/championships/${id}`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        }).then((response) => {
            const championship = response.data.championship;
            const formattedYear = new Date(championship.year).toISOString().substring(0, 10);
            setChampionship({ ...championship, year: formattedYear });
        });

    }, [token, id]);

    const updateChampionship = async (championship) => {
        let msgType = 'success'
        setIsLoading(true) // Ativar indicador de carregamento

        const data = await api.put(`/api/championships/${championship._id}`, championship, {
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
            navigateTo('/')
        }
    }

    return (
        <section className='section-container'>
            <div>
                <h1>Editando: {championship.name} {championship.year}</h1>
            </div>
            {championship.name && (
                <ChampionshipForm
                    handleSubmit={updateChampionship}
                    championshipData={championship}
                    isLoading={isLoading}
                    btnText='Atualizar'
                />
            )}
            {!championship.name && (
                <LoadingPage />
            )}
        </section>
    )
}

export default EditChampionship