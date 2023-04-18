import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../../utils/api'
import '../DashboardGlobal.css'
import './Games.css'
import useFlashMessage from '../../hooks/useFlashMessage'
import LoadingPage from '../LoadingPage/LoadingPage'
import getYear from '../../utils/getYear'

const Games = () => {
    const [games, setGames] = useState([])
    const [token] = useState(localStorage.getItem('Authtoken') || '')
    const { setFlashMessage } = useFlashMessage()
    const [selectedChampionship] = useState(JSON.parse(localStorage.getItem('selectedChampionship')))

    if (games.length > 0) {
        console.log(games)
    }

    useEffect(() => {

        api.get(`/api/games/${selectedChampionship._id}`).then((response) => {
            setGames(response.data.games)
        })

    }, [])

    const removeGame = async (id) => {
        let msgType = 'success'

        const data = await api.delete(`/api/games/${id}`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        }).then((response) => {
            const updatedGames = games.filter((game) => game._id !== id)
            setGames(updatedGames)
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
                <h1>Jogos do campeonato: {selectedChampionship.name} {getYear(selectedChampionship.year)}</h1>
                <Link to='/add/game'>Cadastrar Jogo</Link>
            </div>
            <div className='dashboard-container'>
                {games.length > 0 && (
                    games.map((game) => (
                        <div className='row-game' key={game._id}>
                            <div className='infos-game'>
                                <div className='header'>
                                    <p style={{ justifyContent: 'flex-start' }}>{game.local}</p>
                                    <p style={{ textTransform: 'uppercase' }}>{game.gameInfo}</p>
                                    <p style={{ justifyContent: 'flex-end' }}>{new Date(game.date).toISOString().substring(0, 10)}</p>
                                </div>
                                <div className='game'>
                                    <div className='team'>
                                        <img src={game.homeTeam.shield} alt={game.homeTeam.name} />
                                        <p>{game.homeTeam.name}</p>
                                    </div>
                                    <div className='infos'>
                                        <p id='matchStatus'>{game.matchStatus}</p>
                                        <div>
                                            <span>{game.homeGoals}</span>
                                            <span className='penalty-goals'>{game.penaltyGoalsHome}</span>
                                            <span>x</span>
                                            <span className='penalty-goals'>{game.awayPenaltyGoals}</span>
                                            <span>{game.awayGoals}</span>
                                        </div>
                                        <p id='penaltyStatus'>{game.penaltyStatus ? 'PENALTI' : ''}</p>
                                    </div>
                                    <div className='team'>
                                        <img src={game.awayTeam.shield} alt={game.awayTeam.name} />
                                        <p>{game.awayTeam.name}</p>
                                    </div>
                                </div>
                            </div>
                            <div className='actions' id='actions-game'>
                                <Link to={`/edit/game/${game._id}`}>Editar</Link>
                                <button className='danger' onClick={() => { removeGame(game._id) }}>Excluir</button>
                            </div>
                        </div>
                    ))
                )}
                {games.length === 0 && (
                    <LoadingPage />
                )}
            </div>
        </section>
    )
}

export default Games