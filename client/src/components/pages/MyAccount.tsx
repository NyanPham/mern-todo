import { useAppSelector } from '../../hooks/reduxHooks'
import Avatar from '../Avatar'
import Heading from '../Heading'
import UpdateAccount from '../accounts/UpdateAccount'
import UpdatePassword from '../accounts/UpdatePassword'

const MyAccount = () => {
    const currentUser = useAppSelector((state) => state.currentUser.userInfo)

    if (currentUser == null) return null

    return (
        <div className="flex items-center justify-center gap-12 w-3/4 mx-auto">
            <div className="flex flex-row items-start justify-center bg-white/30 rounded-lg backdrop-blur-sm">
                <div className="flex flex-col items-center justify-start py-10 px-16">
                    <Avatar large imageSrc={currentUser.imageSrc || 'default.jpg'} />
                    <h3 className="mt-7 text-lg text-cyan-900 font-normal italic">
                        <span className="font-semibold not-italic">Username: </span>
                        {currentUser.name}
                    </h3>
                    <h3 className="mt-2 text-lg text-cyan-900 font-normal italic">
                        <span className="font-semibold not-italic">Email: </span>
                        {currentUser.email}
                    </h3>
                </div>
                <div className="text-white border-l border-cyan-800/70">
                    <div className="py-10 pb-7 px-12 border-b border-cyan-800/70">
                        <Heading
                            title="Update My Account"
                            subtitle="You can update your account and change your password here"
                        />
                    </div>
                    <div className="py-7 px-12 space-y-3">
                        <Heading title="Update Profile" />
                        <UpdateAccount />
                    </div>
                    <div className="py-7 px-12 space-y-3">
                        <Heading title="Update Password" />
                        <UpdatePassword />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyAccount
