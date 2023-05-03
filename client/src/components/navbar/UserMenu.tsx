import { Bars3Icon } from '@heroicons/react/20/solid'
import Avatar from '../Avatar'
import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { open as openRegisterModal } from '../../redux/registerModalSlice'
import { open as openLoginModal } from '../../redux/loginModalSlice'
import { removeCurrentUser } from '../../redux/userSlice'

const UserMenu = () => {
    const currentUser = useAppSelector((state) => state.currentUser.userInfo)
    const dispatch = useAppDispatch()
    const [isOpen, setIsOpen] = useState<boolean>(false)

    function toggleMenu() {
        setIsOpen((value) => !value)
    }

    function handleOpenRegister() {
        setIsOpen(false)
        return dispatch(openRegisterModal())
    }

    function handleOpenLogin() {
        setIsOpen(false)
        return dispatch(openLoginModal())
    }

    function handleLogOut() {
        dispatch(removeCurrentUser())
    }

    return (
        <div className="relative">
            <div
                className="py-1 px-1 rounded-full border-[1px] border-gray-900/30 flex flex-row items-center gap-1 cursor-pointer select-none hover:shadow-md hover:-translate-y-[2px] transition duration-250"
                onClick={toggleMenu}
            >
                <Avatar imageSrc={currentUser?.imageSrc} />
                <Bars3Icon className="h-5 w-5 text-gray-500" />
            </div>
            {currentUser == null ? (
                <>
                    <div
                        className={`w-max transition duration-300 absolute top-[120%] right-0 bg-white shadow-md rounded-lg overflow-hidden ${
                            isOpen
                                ? 'translate-y-0 opacity-100 pointer-events-auto'
                                : '-translate-y-2 opacity-0 pointer-events-none'
                        }`}
                    >
                        <div className="py-2 px-5 cursor-pointer hover:bg-sky-500/70" onClick={handleOpenRegister}>
                            Register
                        </div>
                        <hr />
                        <div className="py-2 px-5 cursor-pointer hover:bg-sky-500/70" onClick={handleOpenLogin}>
                            Login
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div
                        className={`w-max transition duration-300 absolute top-[120%] right-0 bg-white shadow-md rounded-lg overflow-hidden ${
                            isOpen
                                ? 'translate-y-0 opacity-100 pointer-events-auto'
                                : '-translate-y-2 opacity-0 pointer-events-none'
                        }`}
                    >
                        <div className="py-2 px-5 cursor-pointer hover:bg-sky-500/70" onClick={() => {}}>
                            My tasks
                        </div>
                        <hr />
                        <div className="py-2 px-5 cursor-pointer hover:bg-sky-500/70" onClick={() => {}}>
                            Create tasks
                        </div>
                        <hr />
                        <div className="py-2 px-5 cursor-pointer hover:bg-sky-500/70" onClick={handleLogOut}>
                            Logout
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default UserMenu
