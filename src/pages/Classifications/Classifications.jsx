import './Classifications.css'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../../utils/api'
import '../DashboardGlobal.css'
import useFlashMessage from '../../hooks/useFlashMessage'
import LoadingPage from '../LoadingPage/LoadingPage'

const Classifications = () => {
    const [classifications, setclassifications] = useState([])
    const [token] = useState(localStorage.getItem('Authtoken') || '')
    const { setFlashMessage } = useFlashMessage()
    const [selectedChampionship] = useState(JSON.parse(localStorage.getItem('selectedChampionship')) || {});

    
    useEffect(() => {

        api.get(`/api/classification/${selectedChampionship._id}`).then((response) => {
            setclassifications(response.data.classifications)
        })

    }, [])

    const removeClassification = async (id) => {
        let msgType = 'success'

        const data = await api.delete(`/api/classifications/${id}`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        }).then((response) => {
            const updatedclassifications = classifications.filter((team) => team._id !== id)
            setclassifications(updatedclassifications)
            return response.data

        }).catch((err) => {
            msgType = 'error'
            return err.response.data
        });

        setFlashMessage(data.message, msgType)
    }

    return (
        <section className='section-container'>
            <div className='dashboard-header'>
                <h1>Classificações</h1>
                <Link to='/add/classification'>Cadastrar Classificação</Link>
            </div>
            <div className='table-container'>
                {classifications.length > 0 && (
                    <table>
                        <thead>
                            <tr>
                                <th>Escudo</th>
                                <th>Nome</th>
                                <th>P</th>
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
                                    <td><img src={classification.team.shield} alt={classification.team.name} /></td>
                                    <td>{classification.team.name}</td>
                                    <td>{classification.points}</td>
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
                                        <button className='danger' onClick={() => { removeClassification(classification._id) }}>Excluir</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
                {classifications.length === 0 && (
                    <h3>Não há Classificações cadastradas no campeonato selecionado!</h3>
                )}
            </div>
        </section>
    )
}

export default Classifications