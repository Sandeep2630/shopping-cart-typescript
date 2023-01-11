import {Routes , Route} from 'react-router-dom'
import { Container } from 'react-bootstrap'
import { Home } from './pages/Home'
import { Store } from './pages/store'
import { About } from './pages/about'
import { Navbar } from './components/Navbar'
function App() {

  return (
  <>
  <Navbar/>
  <Container className='mb-4'>
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/store' element={ <Store />}></Route>
      <Route path='/about' element={ <About />}></Route>
    </Routes>
  </Container>
  </>

  )
}

export default App
