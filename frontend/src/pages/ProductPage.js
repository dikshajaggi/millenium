import React, { useEffect, useState } from 'react'
import { Link, json, useParams } from 'react-router-dom'
import ProductCard from '../components/layout_components/ProductCard'

const ProductPage = () => {
    const { category } = useParams()
    const [products, setProducts] = useState([])

    const getProductsByCategory = async () => {
        const data = await fetch(`http://localhost:8000/api/products/${category}`)
        const jsondata = await data.json()
        setProducts(jsondata)
        console.log(jsondata, "products by catgeory")
    }
    useEffect(() => {
        getProductsByCategory()
    }, [category])
    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-evenly" }}>
            <div>
                <h4 className="category-heading">{category}</h4>
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 2vw", margin: "4vh auto", flexWrap: "wrap", flexBasis: "33.33%", width: "100%" }}>
                {products.map(item => {
                    return (
                        <Link className='style-link' to={`/product/${item.name}/${item._id}`} key={item._id}> <ProductCard data={item} /> </Link>
                    )
                })}
            </div>
        </div>
    )
}

export default ProductPage
