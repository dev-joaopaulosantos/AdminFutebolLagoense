import React, { useEffect, useState } from 'react'
import './Message.css'
import bus from '../../utils/bus'

const Message = () => {
  const [visibility, setVisibility] = useState(false)
  const [message, setMessage] = useState("")
  const [type, setType] = useState("")

  useEffect(() => {
    bus.addListener('flash', ({ message, type }) => {
      setVisibility(true)
      setMessage(message)
      setType(type)

      setTimeout(() => {
        setVisibility(false)
      }, 3000)
    })
  }, [])

  return (
    visibility && (
      <div className='container-message'>
        <div className={`message ${type}`}>{message}</div>
      </div>
    )
  )
}

export default Message