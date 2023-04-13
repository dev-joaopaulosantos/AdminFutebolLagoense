import api from '../utils/api'

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useFlashMessage from '../hooks/useFlashMessage'

export default function useAuth() {
    const [authenticated, setAuthenticated] = useState(false)
    const { setFlashMessage } = useFlashMessage()
    const navigateTo = useNavigate()
    
    useEffect(() => {
        const token = localStorage.getItem('Authtoken')
        if (token) {
            api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`
            setAuthenticated(true)
        }
    }, [])

    async function authUser(data) {
        setAuthenticated(true)

        localStorage.setItem('Authtoken', JSON.stringify(data.token))

        navigateTo('/')
    }

    async function login(user) {
        let msgText = 'Login realizado com sucesso!'
        let msgType = 'success'

        try {

            const data = await api.post('/api/login', user).then((response) => {
                return response.data
            })

            await authUser(data)

        } catch (error) {
            msgText = error.response.data.message
            msgType = 'error'
        }

        setFlashMessage(msgText, msgType)
    }

    function logout() {
        const msgText = 'logout realizado com sucesso!'
        const msgType = 'success'

        setAuthenticated(false)
        localStorage.removeItem('Authtoken')
        api.defaults.headers.Authorization = undefined
        navigateTo('/login')

        setFlashMessage(msgText, msgType)
    }

    return { authenticated, logout, login }
}