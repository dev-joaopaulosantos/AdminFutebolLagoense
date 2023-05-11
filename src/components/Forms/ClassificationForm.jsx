import React, { useEffect, useState } from 'react'
import './Forms.css'
import Input from './Input'
import SelectForm from './SelectForm'
import api from '../../utils/api'
import getYear from '../../utils/getYear'

const ClassificationForm = ({ handleSubmit, classificationData, btnText, isLoading, disabled }) => {
    const [classification, setClassification] = useState(classificationData || {})
    const [championships, setChampionships] = useState([])
    const [teams, setTeams] = useState([])
    const [selectedChampionship] = useState(JSON.parse(localStorage.getItem('selectedChampionship')))

    const optionsChampionships = championships.map((championship) => (
        { key: championship._id, text: `${championship.name} ${getYear(championship.year)}`, value: championship._id }
    ))

    const optionsTeams = teams.map((team) => (
        { key: team._id, text: team.name, value: team._id }
    ))

    useEffect(() => {

        api.get('/api/championships').then((response) => {
            setChampionships(response.data.championships)
        })

        api.get('/api/teams').then((response) => {
            setTeams(response.data.teams)
        })

        setClassification({ ...classification, championship: selectedChampionship._id })

    }, [])

    useEffect(() => {
        const propertiesToCheck = {
            group: 0,
            games: 0,
            points: 0,
            victories: 0,
            ties: 0,
            defeats: 0,
            goalsScored: 0,
            goalsConceded: 0,
            goalDifference: 0,
            yellowCards: 0,
            redCards: 0
        };

        for (const [property, value] of Object.entries(propertiesToCheck)) {
            if (classification[property] === value) {
                setClassification(prevClassification => ({
                    ...prevClassification,
                    [property]: String(value)
                }));
            }
        }
    }, [classification]);


    const handleChange = (e) => {
        setClassification({ ...classification, [e.target.name]: e.target.value })

    }
    const handleOptionsChampionships = (e) => {
        const value = e.target.value
        setClassification({ ...classification, championship: value })
    }
    const handleOptionsTeams = (e) => {
        const value = e.target.value
        setClassification({ ...classification, team: value })
    }

    const submit = (e) => {
        e.preventDefault()
        handleSubmit(classification)
    }

    return (
        <form onSubmit={submit} className='form-container'>
            <SelectForm
                text='Campeonato'
                name='classification'
                options={optionsChampionships}
                handleOnChange={handleOptionsChampionships}
                value={classification.championship}
            />
            <SelectForm
                text='Equipe'
                name='team'
                options={optionsTeams}
                handleOnChange={handleOptionsTeams}
                value={classification.team || ''}
            />
            <Input text='Grupo' type='number' name='group' handleOnChange={handleChange} value={classification.group || ''} />
            <Input text='Jogos' type='number' name='games' handleOnChange={handleChange} value={classification.games || ''} />
            <Input text='Pontos' type='number' name='points' handleOnChange={handleChange} value={classification.points || ''} />
            <Input text='Vitorias' type='number' name='victories' handleOnChange={handleChange} value={classification.victories || ''} />
            <Input text='Empates' type='number' name='ties' handleOnChange={handleChange} value={classification.ties || ''} />
            <Input text='Derrotas' type='number' name='defeats' handleOnChange={handleChange} value={classification.defeats || ''} />
            <Input text='Gols Feitos' type='number' name='goalsScored' handleOnChange={handleChange} value={classification.goalsScored || ''} />
            <Input text='Gols Sofridos' type='number' name='goalsConceded' handleOnChange={handleChange} value={classification.goalsConceded || ''} />
            <Input text='Saldo de Gols' type='number' name='goalDifference' handleOnChange={handleChange} value={classification.goalDifference || ''} />
            <Input text='Cartões Amarelos' type='number' name='yellowCards' handleOnChange={handleChange} value={classification.yellowCards || ''} />
            <Input text='Cartões Vermelhos' type='number' name='redCards' handleOnChange={handleChange} value={classification.redCards || ''} />
            {isLoading === false && (
                <input type="submit" value={btnText} />
            )}
            {isLoading === true && (
                <input
                    type="submit"
                    value="Aguarde..."
                    style={{ backgroundColor: "var(--dark-blue)" }}
                    disabled
                />
            )}

        </form>
    )
}

export default ClassificationForm