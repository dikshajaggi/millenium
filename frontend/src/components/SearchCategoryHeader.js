import React from 'react'
import "../styles.scss"

const SearchCategoryHeader = ({category}) => {
  return (
    <div className='categoryHeader'>
        <h4>{category}</h4>
        <div className="position-relative search-category">
            <form className="d-flex mx-auto" role="search">
                <input className="form-control me-2 search-width" type="search" placeholder="Search" aria-label="Search" />
                <button className="btn btn-outline search-btn" type="submit">Search</button>
            </form>
        </div>
    </div>
  )
}

export default SearchCategoryHeader
