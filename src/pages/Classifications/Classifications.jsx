import './Classifications.css'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../../utils/api'
import '../Dashboard.css'
import useFlashMessage from '../../hooks/useFlashMessage'
import getYear from '../../utils/getYear'
import LoadingPage from '../LoadingPage/LoadingPage'

const Classifications = () => {
    const [classifications, setclassifications] = useState(null)
    const [token] = useState(localStorage.getItem('Authtoken') || '')
    const { setFlashMessage } = useFlashMessage()
    const [selectedChampionship] = useState(JSON.parse(localStorage.getItem('selectedChampionship')) || {});
    const [isLoading, setIsLoading] = useState(false) // Estado para indicar se está carregando
    const navigateTo = useNavigate()

    if (!token) {
        navigateTo('/login')
    }

    useEffect(() => {

        api.get(`/api/classification/${selectedChampionship._id}`).then((response) => {
            setclassifications(response.data.classifications)
        })

    }, [])

    const removeClassification = async (id) => {
        let msgType = 'success'
        setIsLoading(true) // Ativar indicador de carregamento

        const data = await api.delete(`/api/classification/${id}`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        }).then((response) => {
            const updatedclassifications = classifications.filter((classification) => classification._id !== id)
            setclassifications(updatedclassifications)
            return response.data

        }).catch((err) => {
            msgType = 'error'
            return err.response.data
        }).finally(() => {
            setIsLoading(false) // Desativar indicador de carregamento
        })

        setFlashMessage(data.message, msgType)
    }

    return (
        <section className='section-container'>
            <div className='dashboard-header'>
                <h1>Classificação: {selectedChampionship.name} {getYear(selectedChampionship.year)}</h1>
                <Link to='/add/classification'>Cadastrar Classificação</Link>
            </div>
            <div className='table-container'>
                {classifications && classifications.length > 0 && (
                    <table>
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>P</th>
                                <th>J</th>
                                <th>V</th>
                                <th>E</th>
                                <th>D</th>
                                <th>GF</th>
                                <th>GS</th>
                                <th>SG</th>
                                <th>CV</th>
                                <th>CA</th>
                                <th>GP</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {classifications.map((classification) => (
                                <tr key={classification._id}>
                                    <td>{classification.team.name}</td>
                                    <td>{classification.points}</td>
                                    <td>{classification.games}</td>
                                    <td>{classification.victories}</td>
                                    <td>{classification.ties}</td>
                                    <td>{classification.defeats}</td>
                                    <td>{classification.goalsScored}</td>
                                    <td>{classification.goalsConceded}</td>
                                    <td>{classification.goalDifference}</td>
                                    <td>{classification.yellowCards}</td>
                                    <td>{classification.redCards}</td>
                                    <td>{classification.group}</td>
                                    <td className='table-actions'>
                                        <Link to={`/edit/classification/${classification._id}`}>Editar</Link>
                                        {isLoading === false && (
                                            <button className='danger' onClick={() => { removeClassification(classification._id) }}>Excluir</button>
                                        )}
                                        {isLoading == true && (
                                            <button id='btn-disabled' className='danger'>Aguarde</button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
                {classifications && classifications.length === 0 && (
                    <h1>Não há Classificações cadastradas no campeonato selecionado!</h1>
                )}
                {!classifications && (
                    <LoadingPage />
                )}
            </div>
        </section>
    )
}

export default Classifications