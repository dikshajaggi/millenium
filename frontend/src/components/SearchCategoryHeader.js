/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react'
import "../styles.scss"
import { debounce } from "lodash"
import { handleInputBlur, handleInputChange, handleInputFocus, handleResultClick } from '../utils/SearchBar'
import { searchCategoryWise } from '../apis'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const SearchCategoryHeader = ({ category }) => {
  const navigate = useNavigate()
  const [value, setValue] = useState("")
  const [results, setResults] = useState([])
  const [showResults, setShowResults] = useState(false)

  const search = async (searchVal) => {
    const response = await searchCategoryWise(searchVal, category)
    setResults(response.data || [])
    setShowResults(true)
  }

  const handleSearch = useCallback(debounce(search, 300), [])

  useEffect(() => {
    setResults([])
  }, [])

  return (
    <div className='categoryHeader'>
      <h6 className='categoryHeaderh4'>Search for {category}</h6>
      <div className="position-relative search-category ">
        <form className="d-flex mx-auto" role="search" onSubmit={(e) => e.preventDefault()}>
          <input
            className="form-control me-2 search-width"
            type="search"
            placeholder={`Search for ${category}`}
            aria-label="Search"
            value={value}
            onChange={(e) => handleInputChange(e, setValue, setResults, setShowResults, handleSearch)}
            onFocus={() => handleInputFocus(results, setShowResults)}
            onBlur={() => handleInputBlur(setShowResults)}
          />
          <span className="position-absolute search-icon">
            <FontAwesomeIcon icon={faSearch} />
          </span>
        </form>
        {showResults && results.length > 0 && (
          <div className="search-results position-absolute w-100 bg-white border rounded shadow-sm" style={{ top: '45px' }}>
            {results.map((result, index) => (
              <div key={index} className="p-2 border-bottom textStyle" onMouseDown={() => handleResultClick(result, setShowResults, navigate)}>
                {result.name}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// onMouseDown instead of onClick: onMouseDown triggers before the input onBlur event, so it ensures that the click is registered before the dropdown closes.

export default SearchCategoryHeader


