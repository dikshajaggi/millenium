/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import categoryIcon from "../assests/icons/catgeories/braces.png"
import { Link, useLocation } from 'react-router-dom'
import "./styles.scss"

const Categories = ({ category, setCategory }) => {
  const location = useLocation()
  const categories = [
    { id: 0, cat_id: "brackets", name: "Brackets"},
    { id: 1, cat_id: "bands_and_tubes", name: "Bands and Tubes" },
    { id: 2, cat_id: "wires_and_springs", name: "Wires and Springs" },
    { id: 3, cat_id: "elastomerics", name: "Elastomerics" },
    { id: 4, cat_id: "orthodontic_pliers", name: "Orthodontic Pliers" },
    { id: 5, cat_id: "miscellaneous", name: "Miscellaneous" }
  ]

  const handleCategoryClick = (selected) => {
    console.log(selected, "selected")
    if (category === selected) setCategory("all")
    else setCategory(selected)
  }

  useEffect(() => {
    if (location.pathname === "/") setCategory("all")
  }, [location.pathname])

  return (
    <div className='category-card-wrapper'>
      {categories.map(item => {
        return (
          <Link className='style-link' to={`/category/${item.cat_id}`} key={item.id} >
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
