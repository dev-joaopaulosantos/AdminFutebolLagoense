import React, { useEffect, useState } from 'react'
import './Form.css'
import './Input.css'
import './SelectForm.css'
import Input from './Input'
import SelectForm from './SelectForm'
import api from '../../utils/api'
import getYear from '../../utils/getYear'

const ClassificationForm = ({ handleSubmit, classificationData, btnText }) => {
    const [classification, setClassification] = useState(classificationData || {})
    const [championships, setChampionships] = useState([])
    const [teams, setTeams] = useState([])

    const optionsChampionships = championships.map((championship) => (
        { key: championship._id, texto: `${championship.name} ${getYear(championship.year)}`, valor: championship._id }
    ))

    const optionsTeams = teams.map((team) => (
        {key: team._id, texto: team.name, valor: team._id}
    ))

    useEffect(() => {

        api.get('/api/championships').then((response) => {
            setChampionships(response.data.championships)
        })

        api.get('/api/teams').then((response) => {
            setTeams(response.data.teams)
        })

    }, [])

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
                value={classification.championship || ''}
            />
            <SelectForm
                text='Equipe'
                name='team'
                options={optionsTeams}
                handleOnChange={handleOptionsTeams}
                value={classification.team || ''}
            />
            <Input text='Grupo' type='number' name='group' handleOnChange={handleChange} value={classification.group || ''} />
            <Input text='Pontos' type='number' name='points' handleOnChange={handleChange} value={classification.points || 0} />
            <Input text='Vitorias' type='number' name='victories' handleOnChange={handleChange} value={classification.victories || 0} />
            <Input text='Empates' type='number' name='ties' handleOnChange={handleChange} value={classification.ties || 0} />
            <Input text='Derrotas' type='number' name='defeats' handleOnChange={handleChange} value={classification.defeats || 0} />
            <Input text='Gols Feitos' type='number' name='goalsScored' handleOnChange={handleChange} value={classification.goalsScored || 0} />
            <Input text='Gols Sofridos' type='number' name='goalsConceded' handleOnChange={handleChange} value={classification.goalsConceded || 0} />
            <Input text='Saldo de Gols' type='number' name='goalDifference' handleOnChange={handleChange} value={classification.goalDifference || 0} />
            <Input text='Cartões Amarelos' type='number' name='yellowCards' handleOnChange={handleChange} value={classification.yellowCards || 0} />
            <Input text='Cartões Vermelhos' type='number' name='redCards' handleOnChange={handleChange} value={classification.redCards || 0} />
            <input type="submit" value={btnText} />
        </form>
    )
}

export default ClassificationForm