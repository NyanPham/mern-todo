import { createSlice } from '@reduxjs/toolkit'
import { RootState } from './store'
import { Category, ISearchPayload, ISearchResult, Task } from '../types'

interface SearchState {
    isSearching: boolean
    searchTerm: string | ''
    searchResults: ISearchResult[]
}

const initialState: SearchState = {
    isSearching: false,
    searchTerm: '',
    searchResults: [],
}

export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        startSearching: (state) => {
            state.isSearching = true
        },
        stopSearching: (state) => {
            state.isSearching = false
        },
        setSearchTerm: (state, { payload }: { payload: ISearchPayload }) => {
            const { searchTerm, categories, tasks } = payload

            state.searchTerm = searchTerm
            state.isSearching = true

            state.searchResults = [
                ...categories.reduce<ISearchResult[]>((filtered, category: Category) => {
                    if (category.title.includes(searchTerm) || category.description?.includes(searchTerm)) {
                        return [...filtered, { type: 'category', data: category }]
                    }

                    return filtered
                }, []),
                ...tasks.reduce<ISearchResult[]>((filtered, task: Task) => {
                    if (task.title.includes(searchTerm) || task.subtitle?.includes(searchTerm)) {
                        return [...filtered, { type: 'task', data: task }]
                    }

                    return filtered
                }, []),
            ]
        },
    },
})

export const { startSearching, stopSearching, setSearchTerm } = searchSlice.actions
export const searchTerm = (state: RootState) => state.search.searchTerm

export default searchSlice.reducer
