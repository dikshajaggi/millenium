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


export const handleResultClick = (result, setShowResults, navigate) => {
    console.log(result, "result")
    navigate(`/product/${result.name_id}`)
    setShowResults(false)
  }

export const handleInputFocus = (results, setShowResults) => {
    if (results.length > 0) {
        setShowResults(true) 
    }
}

export const handleInputBlur = (setShowResults) => {
    setTimeout(() => {
      setShowResults(false);
    }, 200); // Delay the closing to allow onMouseDown to trigger first
  };