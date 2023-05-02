import { defaultUser } from "../assets/images"

interface AvatarProps {
  imageSrc?: string
}
  
const Avatar: React.FC<AvatarProps> = ({
    imageSrc
}) => {
  const imgSrc = imageSrc == null || imageSrc === "default.jpg" ? defaultUser : imageSrc

  return (
    <div className="rounded-full w-7 h-7 border-[1px] border-gray-300 overflow-hidden">
        <img src={imgSrc} alt="Avatar" className="w-full h-full" />
    </div>
  )
}

export default Avatar