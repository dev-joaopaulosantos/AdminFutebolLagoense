import { Outlet } from 'react-router-dom'

// Components
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import Container from './components/Container/Container'
import Message from './components/Message/Message'


// Context 
import { UserProvider } from './context/UserContext'

function App() {

  return (
    <div className="App">
      <UserProvider>
        <Navbar />
        <Message />
        <Container>
          <Outlet />
        </Container>
        <Footer />
      </UserProvider>
    </div>
  )
}

export default App
