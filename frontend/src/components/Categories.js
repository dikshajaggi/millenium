import React, { useEffect } from 'react'
import categoryIcon from "../assests/icons/braces.png"
import { Link, useLocation } from 'react-router-dom'

const Categories = ({ category, setCategory }) => {
  const location = useLocation()

  const categories = [
    { id: 0, cat_id: "brackets", name: "Brackets" },
    { id: 1, cat_id: "bands_and_tubes", name: "Bands & Tubes" },
    { id: 2, cat_id: "wires_and_springs", name: "Wires & Springs" },
    { id: 3, cat_id: "elastomerics", name: "Elastomerics" },
    { id: 4, cat_id: "orthodontic_pliers", name: "Orthodontic Pliers" },
    { id: 5, cat_id: "miscellaneous", name: "Miscellaneous" }
  ]

  const handleCategoryClick = (selected) => {
    if (category === selected) setCategory("all")
    else setCategory(selected)
  }

  useEffect(() => {
    if (location.pathname === "/") setCategory("all")
  }, [location.pathname])

  return (
    <div className="px-4 py-2">
      <div className="flex flex-nowrap md:grid md:grid-cols-3 lg:grid-cols-6 gap-4 overflow-x-auto md:overflow-visible">
        {categories.map((item) => (
          <Link
            key={item.id}
            to={`/category/${item.cat_id}`}
            onClick={() => handleCategoryClick(item.name)}
            className="min-w-[90px] md:min-w-0"
          >
            <div className="flex flex-col items-center justify-center text-center">
              <img
                src={categoryIcon}
                alt="category"
                className="w-10 h-10 sm:w-12 sm:h-12 object-contain mb-1"
              />
              <span className={`text-sm sm:text-base ${category === item.name ? 'text-blue-600 font-medium' : 'text-gray-700'}`}>
                {item.name}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Categories
