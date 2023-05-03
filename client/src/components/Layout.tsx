import Navbar from './navbar/Navbar'

interface LayoutProps {
    children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="relative pt-28 bg-gradient-to-tr from-purple-900 to-emerald-400 h-screen">
            <Navbar />
            <main>{children}</main>
        </div>
    )
}

export default Layout
