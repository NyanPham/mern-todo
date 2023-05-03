import Categories from '../category/Categories'
import Tasks from '../task/Tasks'

const Home = () => {
    return (
        <div className="flex items-center justify-center gap-12 w-3/4 mx-auto">
            <Categories />
            <Tasks />
        </div>
    )
}

export default Home
