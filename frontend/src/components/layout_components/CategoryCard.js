import React from 'react'
import braces from "../../assests/icons/catgeories/braces.png"
import "../styles.scss"

const CategoryCard = ({ name }) => {
  return (
    <div class="card d-flex flex-column align-items-center res-cat-card">
      <img src={braces} className="card-img-top mx-auto my-auto d-block res-cat-image" alt="braces" />
      <div>
        <p class="card-text card-label-style">{name}</p>
      </div>
    </div>
  )
}

export default CategoryCard
