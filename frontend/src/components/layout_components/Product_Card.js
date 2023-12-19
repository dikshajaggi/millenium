import React from 'react'
import product from "../../assests/products/product.png"

const Product_Card = () => {
    return (
        <div>
            <div class="card" style={{ width: "18rem", marginBottom: "2vh" }}>
                <img src={product} class="card-img-top" alt="product" />
                <div class="card-body">
                    <h5 class="card-title">Card title</h5>
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                </div>
            </div>
        </div>
    )
}

export default Product_Card
