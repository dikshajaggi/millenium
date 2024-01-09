import React from 'react'
import braces from "../../assests/icons/catgeories/braces.png"
import "../styles.scss"

const CategoryCard = ({ name }) => {
  return (
    <div className="card d-flex flex-column align-items-center res-cat-card">
      <img src={braces} className="card-img-top mx-auto my-auto d-block res-cat-image" alt="braces" />
      <div>
        <p className="card-text card-label-style">{name}</p>
      </div>
    </div>
  )
}

export default CategoryCard
