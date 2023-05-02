import { defaultUser } from "../assets/images"

const Avatar = () => {
  return (
    <div className="rounded-full w-7 h-7 border-[1px] border-gray-300 overflow-hidden">
        <img src={defaultUser} alt="Avatar" className="w-full h-full" />
    </div>
  )
}

export default Avatar