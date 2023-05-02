import { Routes, Route } from 'react-router-dom'
import Home from './components/pages/Home'
import Layout from './components/Layout'
import ModalContainer from './components/modals/ModalContainer'

function App() {
  return (
    <div id="app">
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Layout> 
      <ModalContainer>hello</ModalContainer>
    </div>
  )
}

export default App
