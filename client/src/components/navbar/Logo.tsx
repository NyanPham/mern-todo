import { Link } from 'react-router-dom'
import { logo } from '../../assets/images'

const Logo = () => {
    return (
        <Link to="/" className="block cursor-pointer hover:opacity-70 transition duration-200">
            <img className="w-32 h-10" src={logo} alt="Nyan todo with mern stack" width={144} crossOrigin="anonymous" />
        </Link>
    )
}

export default Logo
