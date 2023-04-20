import React, { useEffect, useState } from 'react'
import Input from './Input'
import SelectForm from './SelectForm'
import api from '../../utils/api'
import getYear from '../../utils/getYear'

const GameForm = ({ handleSubmit, gameData, btnText }) => {
    const [game, setGame] = useState(gameData || {})
    const [championships, setChampionships] = useState([])
    const [teams, setTeams] = useState([])
    const [selectedChampionship] = useState(JSON.parse(localStorage.getItem('selectedChampionship')))

    const options = [{ text: 'Sim', value: true }, { text: 'Não', value: false }]
    const optionsStatus = [{ text: 'Encerrado', value: 'encerrado' }, { text: 'W.O', value: 'W.O' }, { text: 'Ao vivo', value: 'Ao vivo' }]

    const optionsChampionships = championships.map((championship) => (
        { key: championship._id, text: `${championship.name} ${getYear(championship.year)}`, value: championship._id }
    ))

    const optionsTeams = teams.map((team) => (
        { key: team._id, text: team.name, value: team._id }
    ))

    useEffect(() => {
        if (game.penaltyStatus === false) {
            setGame({ ...game, penaltyStatus: 'false' })
        }
        if (game.enableClassification === false) {
            setGame({ ...game, enableClassification: 'false' })
        }
    })

    useEffect(() => {

        api.get('/api/championships').then((response) => {
            setChampionships(response.data.championships)
        })

        api.get('/api/teams').then((response) => {
            setTeams(response.data.teams)
        })

        setGame({ ...game, championship: selectedChampionship._id })

    }, [])

    const handleChange = (e) => {
        setGame({ ...game, [e.target.name]: e.target.value })

    }
    const handleOptions = (e) => {
        const value = e.target.value
        setGame({ ...game, [e.target.name]: value })
        console.log(e.target.value)
    }

    const submit = (e) => {
        e.preventDefault()
        handleSubmit(game)

    }

    console.log(game)

    return (
        <form onSubmit={submit} className='form-container'>
            <SelectForm
                text='Campeonato'
                name='championship'
                options={optionsChampionships}
                handleOnChange={handleOptions}
                value={game.championship || ''}
            />
            <SelectForm
                text='Equipe Casa'
                name='homeTeam'
                options={optionsTeams}
                handleOnChange={handleOptions}
                value={game.homeTeam || ''}
            />
            <Input text='Gols Equipe Casa' type='number' name='homeGoals' handleOnChange={handleChange} value={game.homeGoals === 0 ? 0 : game.homeGoals || ''} />
            <SelectForm
                text='Equipe Fora'
                name='awayTeam'
                options={optionsTeams}
                handleOnChange={handleOptions}
                value={game.awayTeam || ''}
            />
            <Input text='Gols Equipe Fora' type='number' name='awayGoals' handleOnChange={handleChange} value={game.awayGoals === 0 ? 0 : game.awayGoals || ''} />

            <Input text='Data' type='date' name='date' handleOnChange={handleChange} value={game.date || ''} />
            <Input text='Local' type='text' name='local' handleOnChange={handleChange} value={game.local || ''} />
            <Input text='Fase' type='number' name='phase' handleOnChange={handleChange} value={game.phase || ''} />
            <Input text='Rodada' type='number' name='round' handleOnChange={handleChange} value={game.round || ''} />
            <Input text='Infomação do jogo' type='text' name='gameInfo' handleOnChange={handleChange} value={game.gameInfo || ''} />
            <SelectForm
                text='Status da Partida'
                name='matchStatus'
                options={optionsStatus}
                handleOnChange={handleOptions}
                value={game.matchStatus || ''}
            />
            <SelectForm
                text='Teve Pênaltis?'
                name='penaltyStatus'
                options={options}
                handleOnChange={handleOptions}
                value={game.penaltyStatus || ''}
            />
            <Input text='Pênaltis Equipe Casa' type='number' name='penaltyGoalsHome' handleOnChange={handleChange} value={game.penaltyGoalsHome === 0 ? 0 : game.penaltyGoalsHome || ''} />
            <Input text='Pênaltis Equipe Fora' type='number' name='awayPenaltyGoals' handleOnChange={handleChange} value={game.awayPenaltyGoals === 0 ? 0 : game.awayPenaltyGoals || ''} />
            <SelectForm
                text='Ativar Classificação?'
                name='enableClassification'
                options={options}
                handleOnChange={handleOptions}
                value={game.enableClassification || ''}
            />
            <input type="submit" value={btnText} />
        </form>
    )
}

export default GameForm