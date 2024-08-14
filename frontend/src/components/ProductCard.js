import React from 'react'
import { Link } from 'react-router-dom'

const ProductCard = ({data}) => {
  return (
    <>
       <Link className='style-link' to={`/product/${data.name}`} key={data.id}>
        <div className='card-main'>
            <div className='card-main-img'>
                <img src={`http://localhost:5000/images/${data.image}`} alt="productimg" className="card-main-product-img" />
            </div>
            <h6 className='card-main-label'>{data.name}</h6>
        </div>
       </Link>
    </>
  )
}

export default ProductCard
