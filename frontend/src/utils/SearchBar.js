export const handleInputChange = (e, setValue, setResults, setShowResults, handleSearch) => {
    const searchValue = e.target.value
    setValue(searchValue)
    handleSearch(searchValue)
    if (searchValue.trim()) {
        handleSearch(searchValue)
      } else {
        setResults([])  
        setShowResults(false)  
      }
}


export const handleResultClick = (result, setShowResults) => {
    console.log(result, "result")
    setShowResults(false)
  }

export const handleInputFocus = (results, setShowResults) => {
    if (results.length > 0) {
        setShowResults(true) 
    }
}

export const handleInputBlur = (setShowResults) => {
    setTimeout(() => {
        setShowResults(false) 
    }, 200) 
} 
