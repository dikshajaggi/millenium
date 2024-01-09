import React, { useContext, useEffect } from 'react'
import SpecificProductCard from '../components/layout_components/SpecificProductCard'
import { useParams } from 'react-router-dom'
import { MainContext } from '../context/MainContext'

const SpecificProduct = () => {
    const data = useParams()
    const context = useContext(MainContext)

    useEffect(() => {
        context.setSearched(false)
        // eslint-disable-next-line
    }, [])

    return (
        <div className="d-flex flex-column align-items-center justify-content-between specific-product-div">
            <SpecificProductCard data={data} />
            {/* <RelatedProducts /> */}
        </div>
    )
}

export default SpecificProduct
