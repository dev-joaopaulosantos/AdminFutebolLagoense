import Logo from '../../assets/img/logo.png'
import './Navbar.css'

import { Link, NavLink } from 'react-router-dom'
import { useContext } from 'react'
import { Context } from '../../context/UserContext'

const Navbar = () => {
    const { authenticated, logout } = useContext(Context)

    return (
        <nav className='navbar'>
            <div className='navbar-logo'>
                {/* <img src={Logo} alt="Futebol Lagoense" /> */}
                <h2>ADMIN API FUTEBOL LAGOENSE</h2>
            </div>
            <ul>
                {
                    authenticated ? (
                        <>
                            <li><NavLink to={"/"}>Campeonatos</NavLink></li>
                            <li><NavLink to={"/games"}>Jogos</NavLink></li>
                            <li><NavLink to={"/classifications"}>Classificações</NavLink></li>
                            <li><NavLink to={"/teams"}>Equipes</NavLink></li>
                            <li onClick={logout} >Sair</li>
                        </>
                    ) : (
                        <>
                            <li><Link to={"/login"}>Entrar</Link></li>
                        </>
                    )
                }
            </ul>
        </nav>
    )
}

export default Navbar