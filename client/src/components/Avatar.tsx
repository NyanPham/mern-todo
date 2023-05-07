import { defaultUser } from '../assets/images'

interface AvatarProps {
    imageSrc: string
    large?: boolean
    medium?: boolean
    isPreview?: boolean
}

const Avatar: React.FC<AvatarProps> = ({ imageSrc, large, medium, isPreview = false }) => {
    let imgSrc = defaultUser

    if (imageSrc != null && imageSrc !== 'default.jpg') {
        imgSrc = isPreview ? imageSrc : `${import.meta.env.VITE_SERVER_URL}/images/avatars/${imageSrc}`
    }

    let avatarSize = 'w-7 h-7'
    if (medium) avatarSize = 'w-16 h-16'
    if (large) avatarSize = 'w-24 h-24'

    return (
        <div className={`rounded-full border-[1px] border-gray-300 overflow-hidden ${avatarSize}`}>
            <img src={imgSrc} alt="Avatar" className="w-full h-full" crossOrigin="anonymous" />
        </div>
    )
}

export default Avatar
