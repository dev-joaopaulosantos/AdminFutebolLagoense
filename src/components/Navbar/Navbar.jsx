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
            <div className='nav-options'>
                {
                    authenticated ? (
                        <>
                            <NavLink to={"/"}>Campeonatos</NavLink>
                            <NavLink to={"/games"}>Jogos</NavLink>
                            <NavLink to={"/classifications"}>Classificações</NavLink>
                            <NavLink to={"/teams"}>Equipes</NavLink>
                            <button onClick={logout} >Sair</button>
                        </>
                    ) : (
                        <>
                            <Link to={"/login"}>Entrar</Link>
                        </>
                    )
                }
            </div>
        </nav>
    )
}

export default Navbar