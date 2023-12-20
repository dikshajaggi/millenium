import React from 'react'
import SpecificProductCard from '../components/layout_components/SpecificProductCard'
import RelatedProducts from '../components/layout_components/RelatedProducts'
import { useParams } from 'react-router-dom'

const SpecificProduct = () => {
    const data = useParams()
    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between", margin: "0 2vw" }}>
            <SpecificProductCard data={data} />
            <RelatedProducts />
        </div>
    )
}

export default SpecificProduct
