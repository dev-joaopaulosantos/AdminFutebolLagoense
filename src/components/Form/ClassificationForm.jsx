import React, { useEffect, useState } from 'react'
import './Form.css'
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

    console.log(optionsChampionships)

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
            <input type="submit" value={btnText} />
        </form>
    )
}

export default ClassificationForm