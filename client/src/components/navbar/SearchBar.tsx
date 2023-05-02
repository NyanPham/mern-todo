import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"
import { useRef } from "react"


const SearchBar = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  
  function handleIconClick() {
    const searchTerm = inputRef?.current?.value

    if (searchTerm) {
      // implement search function later
      console.log('search')
      return
    }
    
    inputRef?.current?.focus()
  }

  return (
    <div className="flex flex-row items-center gap-2 py-1 px-4 text-md text-gray-700 leading-4 rounded-full border border-gray-500/60 outline-none transition duration-250 focus:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-sky-500">
      <label htmlFor="search" hidden aria-hidden>Search</label>
      <input 
        className="outline-none border-none p-0 m-0 focus:outline-none bg-transparent text-white"
        type="text" 
        name="search" 
        ref={inputRef}
      />  
      <MagnifyingGlassIcon 
        className="w-5 h-5 cursor-pointer hover:opacity-50 transition duration-200" 
        onClick={handleIconClick}
      />
    </div>
  )
}

export default SearchBar