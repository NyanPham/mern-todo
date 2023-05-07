import { useRef, useEffect } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { setSearchTerm, stopSearching } from '../../redux/searchSlice'
import { useNavigate } from 'react-router-dom'

const SearchBar = () => {
    const searchTerm = useAppSelector((state) => state.search.searchTerm)
    const isSearching = useAppSelector((state) => state.search.isSearching)
    const tasks = useAppSelector((state) => state.task.tasks)
    const categories = useAppSelector((state) => state.category.categories)

    const inputRef = useRef<HTMLInputElement>(null)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (isSearching) {
            navigate(`/search/${searchTerm}`)
        }
    }, [searchTerm, navigate])

    function handleIconClick() {
        inputRef?.current?.focus()

        if (searchTerm !== '') {
            navigate(`/search/${searchTerm}`)
        }
    }

    function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
        dispatch(
            setSearchTerm({
                searchTerm: e.target.value,
                tasks,
                categories,
            })
        )
    }

    function handleSearchBlur() {
        dispatch(stopSearching())
    }

    function handleSearchFocus() {}

    return (
        <div className="flex flex-row items-center gap-2 py-1 px-4 text-md text-gray-700 leading-4 rounded-full border border-white-500/60 outline-none transition duration-250 focus:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-violet-500">
            <label htmlFor="search" hidden aria-hidden>
                Search
            </label>
            <input
                className="outline-none border-none p-0 m-0 focus:outline-none bg-transparent text-white w-full"
                type="text"
                name="search"
                ref={inputRef}
                value={searchTerm}
                onChange={handleSearchChange}
                onBlur={handleSearchBlur}
                onFocus={handleSearchFocus}
            />
            <MagnifyingGlassIcon
                className="w-5 h-5 cursor-pointer hover:opacity-50 transition duration-200 text-white"
                onClick={handleIconClick}
            />
        </div>
    )
}

export default SearchBar
