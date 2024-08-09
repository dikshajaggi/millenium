import React, {useContext } from 'react'
import ProductCard from './ProductCard'
import "./styles.scss"
import { MainContext } from '../context/MainContext'

const ProductsSection = () => {
    const {products} = useContext(MainContext)
    return (
        <div className="products-section-wrapper" >
        {products.map(item => {
            return (
               <ProductCard key={item.id} data={item} />
            )
        })}
        </div>
    )
}

export default ProductsSection
