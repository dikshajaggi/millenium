import React from 'react'
import SpecificProductCard from '../components/layout_components/SpecificProductCard'
import RelatedProducts from '../components/layout_components/RelatedProducts'

const SpecificProduct = () => {
    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between", margin: "0 2vw" }}>
            <SpecificProductCard />
            <RelatedProducts />
        </div>
    )
}

export default SpecificProduct
