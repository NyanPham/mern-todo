import Navbar from "./navbar/Navbar"

interface LayoutProps {
    children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="relative">
        <Navbar />
        <main>{children}</main>
    </div>
  )
}

export default Layout