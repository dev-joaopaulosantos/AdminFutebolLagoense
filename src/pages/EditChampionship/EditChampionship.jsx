import api from '../../utils/api'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useFlashMessage from '../../hooks/useFlashMessage'

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
            setChampionship(response.data.championship)
            console.log(response.data.championship)
        })

    }, [token, id])

    const updateChampionship = async (championship) => {
        let msgType = 'success'

        const data = await api.put(`/api/championships/${pet._id}`, championship, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
                'Content-Type': 'multipart/form-data'
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
    <div>EditChampionship</div>
  )
}

export default EditChampionship