import React, { useContext, useEffect, useState } from 'react'
import SpecificProductCard from '../components/layout_components/SpecificProductCard'
import RelatedProducts from '../components/layout_components/RelatedProducts'
import { Link, useParams } from 'react-router-dom'
import { MainContext } from '../context/MainContext'
import ProductCard from '../components/layout_components/ProductCard'

const SpecificProduct = () => {
    const data = useParams()
    const context = useContext(MainContext)
    const [searched, setSearched] = useState(false)

    useEffect(() => {
        context.setSearched(false)
    }, [])

    // useEffect(() => {
    //     if (context.searchedProducts !== null) setSearched(true)
    //     if (context.searched === false && context.categorySearch) setSearched(false)
    // }, [context.searched])

    return (
        // <div>
        //     {searched ? <Link className='style-link' to={`/product/${context.searchedProducts.name}/${context.searchedProducts._id}`} key={context.searchedProducts._id}> <ProductCard data={context.searchedProducts} /> </Link> : <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between", margin: "0 2vw" }}>
        //         <SpecificProductCard data={data} />
        //         <RelatedProducts />
        //     </div>}
        // </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between", margin: "0 2vw" }}>
            <SpecificProductCard data={data} />
            {/* <RelatedProducts /> */}
        </div>
    )
}

export default SpecificProduct
