import React from 'react'
import categoryIcon from "../assests/icons/catgeories/braces.png"
import { Link } from 'react-router-dom'

const Categories = ({category, setCategory}) => {
  const categories = [
    { id: 0, name: "Brackets" }, 
    { id: 1, name: "Bands and Tubes" }, 
    { id: 2, name: "wires and springs" },
    { id: 3, name: "elastomerics" }, 
    { id: 4, name: "orthodontic pliers" }, 
    { id: 5, name: "miscellaneous" }
  ]

  const handleCategoryClick = (selected) => {
    console.log(selected, "selected")
    if (category === selected) setCategory("all")
    else setCategory(selected)
  }

  return (
    <div className='category-card-wrapper'>
      {categories.map(item => {
        return(
          <Link to={`/category/${item.name}`} key={item.id} >
            <div className='category-card' onClick={() => handleCategoryClick(item.name)}>
            <img className='category-card-img' src={categoryIcon} alt="category" />
            <h6 className={category === item.name ? "category-card-label-active" : "category-card-label"}>{item.name}</h6>
            </div>
          </Link>
        )
      })}
    </div>
  )
}

export default Categories
