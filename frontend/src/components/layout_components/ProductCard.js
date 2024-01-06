import React from 'react'
import { useLocation } from 'react-router-dom'

const ProductCard = ({ data }) => {
    const location = useLocation()
    console.log(location.pathname === "/", location, "checking main layout")
    return (
        <div style={{ margin: "0 10px" }}>
            <div className="card res-card" >
                <img src={data.cloudinaryImage} className="card-img-top res-product-img" alt="product" />
                <div className="card-body card-label-style">
                    <h5 className="card-title card-label-style text-center text-capitalize res-product-name">{data.name}</h5>
                    {location.pathname === "/" ? null : <p className="card-text card-label-style">{data.description}</p>}
                </div>
            </div>
        </div>
    )
}

export default ProductCard
