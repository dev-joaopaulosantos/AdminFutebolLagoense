import React, { useState } from 'react'
import './Form.css'
import Input from './Input'
import SelectForm from './SelectForm'

const ChampionshipForm = ({ handleSubmit, petData, btnText }) => {
    const [championship, setChampionship] = useState(petData || {})
    const groupStages = ['Sim', 'Não']

    const handleChange = (e) => {
        setChampionship({ ...championship, [e.target.name]: e.target.value })

    }
    const handlegroupStage = (e) => {
        const value = e.target.value === 'Sim'
        setChampionship({ ...championship, groupStage: value })
    }
    const submit = (e) => {
        e.preventDefault()
        handleSubmit(championship)

    }

    return (
        <form onSubmit={submit} className='form-container'>
            <Input text='Nome do campeonato' type='text' name='name' placeholder='Digite o nome do campeonato' handleOnChange={handleChange} value={championship.name || ''} />
            <Input text='Data de início' type='date' name='year' handleOnChange={handleChange} value={championship.year || ''} />
            <SelectForm
                text='Possui fase de grupos?'
                name='groupStage'
                options={groupStages}
                handleOnChange={handlegroupStage}
                value={championship.groupStage}
            />
            <input type="submit" value={btnText} />
        </form>
    )
}

export default ChampionshipForm