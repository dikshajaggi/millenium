import React, { useEffect, useState } from 'react'
import CategoryCard from './layout_components/CategoryCard'
import { Link } from 'react-router-dom'

const Categories = () => {
  const [categories, setCategories] = useState([
    { id: 0, name: "Brackets" }, { id: 1, name: "Bands and Tubes" }, { id: 2, name: "wires and springs" },
    { id: 3, name: "elastomerics" }, { id: 4, name: "orthodontic pliers" }, { id: 5, name: "miscellaneous" }])

  const getCategories = async () => {
    const data = await fetch("https://millenium-orthodontics.onrender.com/api/categories")
    const jsonData = await data.json()
    console.log(jsonData)
    setCategories(jsonData)
  }

  useEffect(() => {
    getCategories()
  }, [])

  return (
    <div className='catgeory-wrapper'>
      {console.log(categories, "-------")}
      {categories !== null && categories.map(item => {
        return (
          <Link className='style-link' to={`/${item.name}`} key={item._id}>
            <CategoryCard name={item.name} />
          </Link>
        )
      })}
    </div>
  )
}

export default Categories
