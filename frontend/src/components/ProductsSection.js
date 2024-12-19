/* eslint-disable react-hooks/exhaustive-deps */

import React, { useContext, useEffect, useState } from 'react'
import ProductCard from './ProductCard'
import "./styles.scss"
import { MainContext } from '../context/MainContext'

const ProductsSection = ({ category }) => {
    const { products } = useContext(MainContext)
    const [cat, setCat] = useState(category)

    useEffect(() => {
        let formattedStr = category.replace(/_/g, ' ')
        formattedStr = formattedStr.replace(/ and /gi, ' & ')
        setCat(formattedStr)
    }, [])

    return (
        <div className='products-catwise-wrapper'>
            <div className='category-heading-label'>{cat}</div>
            <div className="products-section-wrapper" >
                {products
                    .filter((item) => item.category === category) // Filter items based on the category
                    .slice(0, 6) // Limit the number of items to 6
                    .map((item) => (
                        <ProductCard key={item.id} data={item} />
                    ))}
            </div>
        </div>
    )
}

export default ProductsSection
