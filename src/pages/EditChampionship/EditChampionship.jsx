import api from '../../utils/api'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useFlashMessage from '../../hooks/useFlashMessage'
import ChampionshipForm from '../../components/Form/ChampionshipForm'

const EditChampionship = () => {
    const [championship, setChampionship] = useState({})
    const [token] = useState(localStorage.getItem('Authtoken') || '')
    const { setFlashMessage } = useFlashMessage()
    const { id } = useParams()

    useEffect(() => {
        api.get(`/api/championships/${id}`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        }).then((response) => {
            const championship = response.data.championship;
            const formattedYear = new Date(championship.year).toISOString().substring(0, 10);
            setChampionship({...championship, year: formattedYear});
        });
    }, [token, id]);
    
    
    
    
    const updateChampionship = async (championship) => {
        let msgType = 'success'

        const data = await api.put(`/api/championships/${championship._id}`, championship, {
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
    }

  return (
    <section>
        <div>
            <h1>Editando Campeonato: {championship.name}</h1>
        </div>
        {championship.name && (
                <ChampionshipForm handleSubmit={updateChampionship} btnText='Atualizar' championshipData={championship} />
            )}
    </section>
  )
}

export default EditChampionship