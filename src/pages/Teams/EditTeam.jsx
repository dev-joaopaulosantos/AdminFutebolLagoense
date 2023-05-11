import api from '../../utils/api'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useFlashMessage from '../../hooks/useFlashMessage'
import TeamForm from '../../components/Forms/TeamForm'
import LoadingPage from '../LoadingPage/LoadingPage'

const EditTeam = () => {
    const [team, setTeam] = useState({})
    const [token] = useState(localStorage.getItem('Authtoken') || '')
    const { setFlashMessage } = useFlashMessage()
    const [isLoading, setIsLoading] = useState(false) // Estado para indicar se está carregando
    const navigateTo = useNavigate()
    const { id } = useParams()

    if (!token) {
        navigateTo('/login')
    }

    useEffect(() => {
        api.get(`/api/team/${id}`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        }).then((response) => {
            setTeam(response.data.team)

        });

    }, [token, id]);

    const updateTeam = async (team) => {
        let msgType = 'success'
        setIsLoading(true) // Ativar indicador de carregamento

        const data = await api.put(`/api/teams/${team._id}`, team, {
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
            navigateTo('/teams')
        }
    }

    return (
        <section>
            <div>
                <h1>Editando Equipe: {team.name}</h1>
            </div>
            {team.name && (
                <TeamForm
                    handleSubmit={updateTeam}
                    btnText='Atualizar'
                    teamData={team}
                    isLoading={isLoading}
                />
            )}
            {!team.name && (
                <LoadingPage />
            )}
        </section>
    )
}

export default EditTeam