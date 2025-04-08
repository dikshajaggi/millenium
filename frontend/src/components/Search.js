import React, { useCallback, useState } from 'react'
import { debounce } from "lodash"
import { handleInputBlur, handleInputChange, handleInputFocus, handleResultClick } from '../utils/SearchBar'
import { searchAll } from '../apis'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

const Search = () => {
  const [value, setValue] = useState("")
  const [results, setResults] = useState([])
  const [showResults, setShowResults] = useState(false)
  const navigate = useNavigate()

  const search = async (searchVal) => {
    const response = await searchAll(searchVal)
    setResults(response.data || [])
    setShowResults(true)
  }

  const handleSearch = useCallback(debounce(search, 300), [])

  return (
    <div className="relative w-full max-w-xl">
      <form onSubmit={(e) => e.preventDefault()} className="relative">
        <input
          type="search"
          placeholder="Search for products"
          aria-label="Search"
          value={value}
          onChange={(e) => handleInputChange(e, setValue, setResults, setShowResults, handleSearch)}
          onFocus={() => handleInputFocus(results, setShowResults)}
          onBlur={() => handleInputBlur(setShowResults)}
          className="w-full rounded-xl pl-11 pr-4 py-2.5 text-sm border border-gray-300 shadow-sm placeholder-gray-400 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
        />
        <FontAwesomeIcon
          icon={faSearch}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-400 text-base"
        />
      </form>

      {showResults && results.length > 0 && (
        <div className="absolute z-20 mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-lg max-h-64 overflow-y-auto">
          {results.map((result, index) => (
            <div
              key={index}
              onMouseDown={() => handleResultClick(result, setShowResults, navigate)}
              className="px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 cursor-pointer transition-colors duration-150"
            >
              {result.name}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Search
