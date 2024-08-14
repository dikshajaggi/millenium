import React from 'react'
import { useParams } from 'react-router-dom'
import "./styles.scss";
import SearchCategoryHeader from '../components/SearchCategoryHeader'

const SpecificCategory = () => {
    const params = useParams()
    console.log(params, "params category")
  return (
    <div className='specific-cat-wrapper'>
      <SearchCategoryHeader category={params.category}/>
    </div>
  )
}

export default SpecificCategory
