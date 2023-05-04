import React, { useEffect, useState } from 'react'
import './Forms.css'
import Input from './Input'
import SelectForm from './SelectForm'

const ChampionshipForm = ({ handleSubmit, championshipData, btnText }) => {
    const [championship, setChampionship] = useState(championshipData || {})
    const groupStages = [
        { text: 'Sim', value: true },
        { text: 'Não', value: false }
    ]

    useEffect(() => {
        if (championship.groupStage === false) {
            setChampionship({ ...championship, groupStage: 'false' })
        }
        if (championship.selected === false) {
            setChampionship({ ...championship, selected: 'false' })
        }
    })

    const handleChange = (e) => {
        setChampionship({ ...championship, [e.target.name]: e.target.value })

    }
    const handlegroupStage = (e) => {
        setChampionship({ ...championship, [e.target.name]: e.target.value })
    }

    const submit = (e) => {
        e.preventDefault()
        handleSubmit(championship)

    }



    return (
        <form onSubmit={submit} className='form-container'>
            <Input text='Campeonato' type='text' name='name' placeholder='Digite o nome do campeonato' handleOnChange={handleChange} value={championship.name || ''} />
            <Input text='Data de início' type='date' name='year' handleOnChange={handleChange} value={championship.year || ''} />
            <Input text='imagem' type='text' name='image' handleOnChange={handleChange} value={championship.image || ''} />
            <SelectForm
                text='Possui fase de grupos?'
                name='groupStage'
                options={groupStages}
                handleOnChange={handlegroupStage}
                value={championship.groupStage || ''}
            />
            <Input text='Campeão' type='text' name='champion' placeholder='Digite a premiação do campeonato' handleOnChange={handleChange} value={championship.champion || ''} />
            <Input text='Segundo Colocado' type='text' name='secondPlace' placeholder='Segundo colocado do campeonato' handleOnChange={handleChange} value={championship.secondPlace || ''} />
            <Input text='Terceiro Colocado' type='text' name='thirdPlace' placeholder='Terceiro colocado do campeonato' handleOnChange={handleChange} value={championship.thirdPlace || ''} />
            <Input text='Premiação' type='text' name='award' placeholder='Premiação do campeonato' handleOnChange={handleChange} value={championship.award || ''} />
            <Input text='Artilheiro' type='text' name='goalScorer' placeholder='Artilheiro do campeonato' handleOnChange={handleChange} value={championship.goalScorer || ''} />
            <Input text='Melhor Jogador' type='text' name='bestPlayer' placeholder='Melhor jogador do campeonato' handleOnChange={handleChange} value={championship.bestPlayer || ''} />
            <Input text='Melhor Goleiro' type='text' name='bestGoalkeeper' placeholder='Melhor goleiro do campeonato' handleOnChange={handleChange} value={championship.bestGoalkeeper || ''} />
            <SelectForm
                text='Campeonato atual?'
                name='selected'
                options={groupStages}
                handleOnChange={handlegroupStage}
                value={championship.selected || ''}
            />
            <input type="submit" value={btnText} />
        </form>
    )
}

export default ChampionshipForm