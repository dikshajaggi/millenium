import React from 'react'
import productimg from "../../assests/products/product.png"

const Cart_card = ({ data }) => {
    console.log(data, "data")
    return (
        <div>
            <div class="card mb-3" style={{ maxWidth: "1200px", minHeight: "400px" }}>
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src={data.cloudinaryImage} class="img-fluid rounded-start" alt="productimg" />
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">{data.name}</h5>
                            <p class="card-text">{data.description}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart_card
