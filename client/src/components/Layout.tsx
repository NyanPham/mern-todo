import Navbar from './navbar/Navbar'

interface LayoutProps {
    children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="relative pt-40 md:pt-28 bg-gradient-to-tr from-purple-900 to-emerald-400 min-h-screen pb-24">
            <Navbar />
            <main>{children}</main>
        </div>
    )
}

export default Layout
