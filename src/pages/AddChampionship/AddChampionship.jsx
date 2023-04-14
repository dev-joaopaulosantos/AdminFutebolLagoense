import './AddChampionship.css'
import api from '../../utils/api'
import { useNavigate } from 'react-router-dom'

// Custom hooks
import useFlashMessage from '../../hooks/useFlashMessage'
import { useState } from 'react'
import Input from '../../components/Form/Input'
import SelectForm from '../../components/Form/SelectForm'

const AddChampionship = () => {
    const [championship, setChampionship] = useState({})
    const [token] = useState(localStorage.getItem('Authtoken') || '')
    const { setFlashMessage } = useFlashMessage()
    const navigateTo = useNavigate()
    const groupStages = ['Sim', 'Não']

    const handleChange = (e) => {
        setChampionship({ ...championship, [e.target.name]: e.target.value })

    }
    const handlegroupStage = (e) => {
        const value = e.target.value === 'Sim'
        setChampionship({ ...championship, groupStage: value })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        registerChampionship(championship)

    }

    const registerChampionship = async (championship) => {
        let msgType = 'success'

        const data = await api.post('/api/championships', championship, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
            },
        }).then((response) => {
            return response.data

        }).catch((err) => {
            msgType = 'error'
            return err.response.data
        });

        setFlashMessage(data.message, msgType)
        if (msgType !== 'error') {
            navigateTo('/')
        }
    }

    return (
        <section>
            <div className='addchampionship-header'>
                <h1>Cadastrar Campeonato</h1>
            </div>
            <form onSubmit={handleSubmit} className='form-container'>
                <Input text='Nome do campeonato' type='text' name='name' placeholder='Digite o nome do campeonato' handleOnChange={handleChange} value={championship.name || ''} />
                <Input text='Data de início' type='date' name='year' handleOnChange={handleChange} value={championship.year || ''} />
                <SelectForm
                    text='Possui fase de grupos?'
                    name='groupStage'
                    options={groupStages}
                    handleOnChange={handlegroupStage}
                    value={championship.groupStage}
                />
                <input type="submit" value={'Cadastrar Campeonato'} />
            </form>
        </section>
    )
}

export default AddChampionship