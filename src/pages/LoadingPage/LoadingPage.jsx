import React from 'react'
import './LoadingPage.css'
import LoadingCircle from '../../assets/img/loading-circle.gif'

const LoadingPage = () => {
  return (
    <div className='loading-page'>
        <img src={LoadingCircle} alt="Carregando conteudo" />
    </div>
  )
}

export default LoadingPage