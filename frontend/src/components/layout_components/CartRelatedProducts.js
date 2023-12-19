import React from 'react'
import Product_Card from './Product_Card'

const CartRelatedProducts = () => {
    return (
        <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between" }}>
            <h1>Related Products</h1>
            <div className="d-flex flex-column align-items-center justify-content-space-between" style={{ padding: "0 2vw", margin: "4vh auto" }}>
                <Product_Card />
                <Product_Card />
                <Product_Card />
                <Product_Card />
            </div>
        </div>
    )
}

export default CartRelatedProducts
