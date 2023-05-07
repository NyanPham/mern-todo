import Logo from './Logo'
import SearchBar from './SearchBar'
import UserMenu from './UserMenu'

const Navbar = () => {
    return (
        <header className="fixed top-0 left-0 w-full z-10">
            <nav className="w-full py-4 px-7 flex flex-row items-center justify-between shadow-md bg-white/30 backdrop-blur-lg">
                <Logo />
                <div className="hidden md:block">
                    <SearchBar />
                </div>
                <UserMenu />
            </nav>
            <div className="w-full py-4 px-7 shadow-md bg-white/30 backdrop-blur-lg block md:hidden">
                <SearchBar />
            </div>
        </header>
    )
}

export default Navbar
