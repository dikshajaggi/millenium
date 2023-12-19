import React from 'react'
import Product_Card from '../components/layout_components/Product_Card'
import { useParams } from 'react-router-dom'

const ProductPage = () => {
    const { category } = useParams()
    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-evenly" }}>
            <div>
                <h4 className="category-heading">{category}</h4>
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", margin: "4vh 2vw", flexWrap: "wrap", flexBasis: "33.33%" }}>
                <Product_Card />
                <Product_Card />
                <Product_Card />
                <Product_Card />
                <Product_Card />
                <Product_Card />
                <Product_Card />
                <Product_Card />
                <Product_Card />
                <Product_Card />
                <Product_Card />
                <Product_Card />
                <Product_Card />
                <Product_Card />
                <Product_Card />
                <Product_Card />
                <Product_Card />
            </div>
        </div>
    )
}

export default ProductPage
