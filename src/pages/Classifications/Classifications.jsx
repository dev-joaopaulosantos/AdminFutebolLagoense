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

    useEffect(() => {

        api.get('/api/classification/642f84edcb4d82be673305da').then((response) => {
            setclassifications(response.data.classifications)
        })

    }, [])

    console.log('Classificações:', classifications)

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
                    <LoadingPage />
                )}
            </div>
        </section>
    )
}

export default Classifications

{/* <div className='dashboard-row' key={classification._id}>
<div className='classification-infos'>
    <div className='name-shield'>
        <img src={classification.team.shield} alt={classification.name} />
        <p>{classification.team.name}</p>
    </div>
    <div className='info'>
        <p>P</p>
        <p>{classification.points}</p>
    </div>
    <div className='info'>
        <p>V</p>
        <p>{classification.victories}</p>
    </div>
    <div className='info'>
        <p>E</p>
        <p>{classification.ties}</p>
    </div>
    <div className='info'>
        <p>D</p>
        <p>{classification.defeats}</p>
    </div>
    <div className='info'>
        <p>G.M</p>
        <p>{classification.goalsScored}</p>
    </div>
    <div className='info'>
        <p>G.C</p>
        <p>{classification.goalsConceded}</p>
    </div>
    <div className='info'>
        <p>S.G</p>
        <p>{classification.goalDifference}</p>
    </div>
    <div className='info'>
        <p>C.V</p>
        <p>{classification.yellowCards}</p>
    </div>
    <div className='info'>
        <p>C.A</p>
        <p>{classification.redCards}</p>
    </div>
</div>
<div className='actions'>
    <Link to={`/edit/classification/${classification._id}`}>Editar</Link>
    <button className='danger' onClick={() => { removeClassification(classification._id) }}>Excluir</button>
</div>
</div> */}