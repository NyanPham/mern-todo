import { Routes, Route } from 'react-router-dom'
import Home from './components/pages/Home'
import Layout from './components/Layout'
import ModalContainer from './components/modals/ModalContainer'
import ToastContainer from './components/toasts/ToastContainer'
import MyAccount from './components/pages/MyAccount'
import Search from './components/pages/Search'

function App() {
    return (
        <div id="app">
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/myAccount" element={<MyAccount />} />
                    <Route path="/search" element={<Search />} />
                </Routes>
            </Layout>
            <ModalContainer />
            <ToastContainer />
        </div>
    )
}

export default App
