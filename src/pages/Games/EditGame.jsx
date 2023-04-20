import api from '../../utils/api'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useFlashMessage from '../../hooks/useFlashMessage'
import GameForm from '../../components/Form/GameForm'
import LoadingPage from '../LoadingPage/LoadingPage'

const EditGame = () => {
    const [game, setGame] = useState()
    const [token] = useState(localStorage.getItem('Authtoken') || '')
    const { setFlashMessage } = useFlashMessage()
    const navigateTo = useNavigate()
    const { id } = useParams()

    useEffect(() => {
        api.get(`/api/onegame/${id}`, {

        }).then((response) => {
            const game = response.data.game;
            const formattedYear = new Date(game.date).toISOString().substring(0, 10);
            setGame({ ...game, date: formattedYear });
        });

    }, [token, id]);

    console.log(game)

    const updateGame = async (game) => {
        let msgType = 'success'

        const data = await api.put(`/api/games/${game._id}`, game, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        }).then((response) => {
            return response.data

        }).catch((err) => {
            msgType = 'error'
            return err.response.data
        });

        setFlashMessage(data.message, msgType)
        if (msgType !== 'error') {
            navigateTo('/games')
        }
    }

    return (
        <section>
            <div>
                {game && (
                    <h1>Editando Jogo:
                        <span> {game.homeTeam.name} </span>
                        <span> {game.homeGoals} </span>
                        <span> x </span>
                        <span> {game.awayGoals} </span>
                        <span> {game.awayTeam.name} </span>
                    </h1>
                )}
            </div>
            {game && (
                <GameForm handleSubmit={updateGame} gameData={game} btnText="Atualizar" />
            )}
            {!game && (
                <LoadingPage />
            )}
        </section>
    )
}

export default EditGame