import { Routes, Route } from 'react-router-dom'
import Home from './components/pages/Home'
import Layout from './components/Layout'
import ModalContainer from './components/modals/ModalContainer'
import ToastContainer from './components/toasts/ToastContainer'
import useCookies from 'react-cookie/cjs/useCookies'

function App() {
    const [cookies] = useCookies(['jwt'])

    return (
        <div id="app">
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />} />
                </Routes>
            </Layout>
            <ModalContainer />
            <ToastContainer />
        </div>
    )
}

export default App
