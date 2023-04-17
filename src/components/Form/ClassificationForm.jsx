import React, { useState } from 'react'
import './Form.css'
import Input from './Input'
import SelectForm from './SelectForm'

const ClassificationForm = ({ handleSubmit, classificationData, btnText }) => {
    const [classification, setClassification] = useState(classificationData || {})
    const optionsclassifications = [
        { texto: 'Copão Rural e Urbano', valor: 'id01' },
        { texto: 'Copa Cidade', valor: 'id02' }
    ]
    const optionsTeams = [
        { texto: 'Boa Esporte', valor: 'id01' },
        { texto: 'Maracoan', valor: 'id02' }
    ]

    const handleChange = (e) => {
        setClassification({ ...classification, [e.target.name]: e.target.value })

    }
    const handleOptionsChampionships = (e) => {
        const value = e.target.value
        setClassification({ ...classification, classification: value })
    }
    const handleOptionsTeams = (e) => {
        const value = e.target.value
        setClassification({ ...classification, classification: value })
    }
    const submit = (e) => {
        e.preventDefault()
        handleSubmit(classification)

    }
    return (
        <form onSubmit={submit} className='form-container'>
            <SelectForm
                text='Campeonato:'
                name='classification'
                options={optionsclassifications}
                handleOnChange={handleOptionsChampionships}
                value={classification.championship || ''}
            />
            <SelectForm
                text='Equipe:'
                name='team'
                options={optionsTeams}
                handleOnChange={handleOptionsTeams}
                value={classification.team || ''}
            />
            <Input text='Data de início' type='date' name='year' handleOnChange={handleChange} value={classification.year || ''} />
            <input type="submit" value={btnText} />
        </form>
    )
}

export default ClassificationForm