import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import Categories from '../category/Categories'
import Tasks from '../task/Tasks'
import { open as openLoginModal } from '../../redux/loginModalSlice'

const Home = () => {
    const currentUser = useAppSelector((state) => state.currentUser.userInfo)
    const dispatch = useAppDispatch()

    if (currentUser == null)
        return (
            <div className="flex flex-col justify-center items-center text-white">
                <h2 className="font-semibold text-2xl">You have not logged in</h2>
                <h3 className="text-md">
                    Please{' '}
                    <span
                        className="hover:underline hover:underline-offset-4 font-medium text-cyan-300 cursor-pointer"
                        onClick={() => dispatch(openLoginModal())}
                    >
                        login
                    </span>{' '}
                    to continue
                </h3>
            </div>
        )

    return (
        <div className="flex items-center justify-center gap-12 w-3/4 mx-auto">
            <Categories />
            <Tasks />
        </div>
    )
}

export default Home
