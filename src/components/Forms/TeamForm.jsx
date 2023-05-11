import React, { useState } from 'react'
import './Forms.css'
import Input from './Input'

const TeamForm = ({ handleSubmit, teamData, btnText, isLoading }) => {
    const [team, setTeam] = useState(teamData || {})

    const handleChange = (e) => {
        setTeam({ ...team, [e.target.name]: e.target.value })

    }
    const submit = (e) => {
        e.preventDefault()
        handleSubmit(team)

    }
    return (
        <form onSubmit={submit} className='form-container'>
            <Input text='Nome do campeonato' type='text' name='name' placeholder='Digite o nome da equipe' handleOnChange={handleChange} value={team.name || ''} />
            <Input text='Data de início' type='text' name='shield' placeholder='Cole aqui o link do escudo' handleOnChange={handleChange} value={team.shield || ''} />
            {isLoading === false && (
                <input type="submit" value={btnText} />
            )}
            {isLoading === true && (
                <input
                    type="submit"
                    value="Aguarde..."
                    id='btn-disabled'
                    disabled
                />
            )}
        </form>
    )
}

export default TeamForm