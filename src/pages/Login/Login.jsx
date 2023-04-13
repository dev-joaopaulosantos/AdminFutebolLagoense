import './Login.css'
import '../../components/Form/Form.css'
import Input from '../../components/Form/Input'
import { useContext, useState } from 'react'

// context
import { Context } from '../../context/UserContext'

const Login = () => {
  const [user, setUser] = useState({})
  const { login } = useContext(Context)

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
    
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    login(user)
  }

  return (
    <section className='form-container'>
      <h1>Login</h1>
      <form onSubmit={handleSubmit} >
        <Input text='Senha' type='password' name='password' placeholder='Digite a sua senha' handleOnChange={handleChange} />

        <input type='submit' value='Entrar' />
      </form>
    </section>
  )
}

export default Login