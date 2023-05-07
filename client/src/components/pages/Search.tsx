import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { selectCategory, setHighlighted as setCategoryHighlighted } from '../../redux/categorySlice'
import { AppDispatch } from '../../redux/store'
import { setCurrentTaskId, setHighlighted as setTaskHighlighted } from '../../redux/taskSlice'
import { ISearchResult, Task } from '../../types'
import Heading from '../Heading'
import SearchResult from '../search/SearchResult'

function handleSelectCategorySearch(categoryId: string, dispatch: AppDispatch) {
    dispatch(selectCategory({ categoryId }))
    dispatch(setCategoryHighlighted(true))
}
    
function handleSelectTaskSearch(categoryId: string, taskId: string, dispatch: AppDispatch) {
    dispatch(selectCategory({ categoryId }))
    dispatch(setCurrentTaskId({ taskId }))
    dispatch(setTaskHighlighted(true))
}

const Search = () => {
    const searchTerm = useAppSelector((state) => state.search.searchTerm)
    const searchResults = useAppSelector((state) => state.search.searchResults)
    const dispatch = useAppDispatch()

    const navigate = useNavigate()

    function handleResultClick(result: ISearchResult) {
        if (result.type == 'category') {
            handleSelectCategorySearch(result.data._id, dispatch)
        } else {
            handleSelectTaskSearch((result.data as Task).categoryId, result.data._id, dispatch)
        }

        navigate('/')
    }

    return (
        <section className="w-full px-7">
            {searchTerm == '' ? (
                <Heading title="Enter something to search for..." center />
            ) : (
                <Heading title={`Searching: ${searchTerm}`} subtitle={`Results: ${searchResults.length}`} />
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 row-auto gap-3">
                {searchResults.map((result, index) => (
                    <SearchResult key={`${result.type}-${index}`} result={result} onClick={handleResultClick} />
                ))}
            </div>
        </section>
    )
}

export default Search
