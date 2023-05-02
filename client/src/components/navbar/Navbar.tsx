import Logo from "./Logo"
import SearchBar from "./SearchBar"
import UserMenu from "./UserMenu"

const Navbar = () => {
  return (
    <header className="sticky top-0 left-0 w-full">
        <nav className="w-full py-4 px-7 flex flex-row items-center justify-between shadow-md bg-white"> 
            <Logo />
            <SearchBar />
            <UserMenu />
        </nav>
    </header>
  )
}

export default Navbar