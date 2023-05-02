import { logo } from "../../assets/images"

const Logo = () => {
  return (
    <div className="cursor-pointer hover:opacity-70 transition duration-200">
      <img 
        className="w-36 h-10"
        src={logo} 
        alt="Nyan todo with mern stack" 
        width={144} 
      />
    </div>
  )
}

export default Logo