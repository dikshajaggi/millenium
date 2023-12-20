import React from 'react'
import { useParams } from 'react-router-dom'

const ProductPage = () => {
    const { category } = useParams()
    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-evenly" }}>
            <div>
                <h4 className="category-heading">{category}</h4>
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", margin: "4vh 2vw", flexWrap: "wrap", flexBasis: "33.33%" }}>
            </div>
        </div>
    )
}

export default ProductPage
