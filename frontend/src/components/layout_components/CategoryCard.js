import React from 'react'
import braces from "../../assests/icons/catgeories/braces.png"
import "../styles.scss"

const CategoryCard = ({ name }) => {
  return (
    <div class="card d-flex flex-column align-items-center" style={{ width: "10rem", border: "none", height: "6rem" }}>
      <img src={braces} style={{ width: "35%" }} className="card-img-top mx-auto my-auto d-block" alt="braces" />
      <div>
        <p class="card-text card-label-style">{name}</p>
      </div>
    </div>
  )
}

export default CategoryCard
