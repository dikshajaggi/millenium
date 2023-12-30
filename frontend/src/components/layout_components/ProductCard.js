import React from 'react'
import product from "../../assests/products/product.png"

const ProductCard = ({ data }) => {
    return (
        <div style={{ margin: "0 10px" }}>
            <div class="card" style={{ width: "14rem", marginBottom: "2vh" }}>
                <img src={data.cloudinaryImage} class="card-img-top" alt="product" />
                <div class="card-body card-label-style">
                    <h5 class="card-title card-label-style">{data.name}</h5>
                    <p class="card-text card-label-style">{data.description}</p>
                </div>
            </div>
        </div>
    )
}

export default ProductCard
