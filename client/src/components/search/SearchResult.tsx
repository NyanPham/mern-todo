import React from 'react'
import { Category, Task, ISearchResult } from '../../types'

interface SearchResult {
    result: ISearchResult
    onClick: (result: ISearchResult) => void
}

const SearchResult: React.FC<SearchResult> = ({ result, onClick }) => {
    const { type, data } = result

    return (
        <div className="bg-white/30 py-2 px-4 rounded-lg cursor-pointer select-none" onClick={() => onClick(result)}>
            <h3 className="text-white font-semibold text-xl">
                Type: <span className="capitalize">{type}</span>
            </h3>
            <h4 className="font-semibold text-xl">Title: {data.title}</h4>
            {type === 'category' && (data as Category).description && (
                <p className="">{(data as Category).description}</p>
            )}
            {type === 'task' && (data as Task).subtitle && <p className="">{(data as Task).subtitle}</p>}
        </div>
    )
}

export default SearchResult
