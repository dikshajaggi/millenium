import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ProductCard from '../components/layout_components/ProductCard'
import { MainContext } from '../context/MainContext'

const ProductPage = () => {
    const context = useContext(MainContext)
    const { category } = useParams()
    const [products, setProducts] = useState([])
    const [searched, setSearched] = useState(false)

    const getProductsByCategory = async () => {
        const data = await fetch(`http://localhost:8000/api/products/${category}`)
        const jsondata = await data.json()
        setProducts(jsondata)
        console.log(jsondata, "products by catgeory")
    }
    useEffect(() => {
        context.setSearched(false)
        getProductsByCategory()
        // eslint-disable-next-line
    }, [category])

    useEffect(() => {
        if (context.searchedProducts !== null && context.categorySearch) setSearched(true)
        if (context.searched === false && context.categorySearch) setSearched(false)
        // eslint-disable-next-line
    }, [context.searched])
    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-evenly" }}>
            {searched ? <Link className='style-link' to={`/product/${context.searchedProducts.name}/${context.searchedProducts._id}`} key={context.searchedProducts._id}> <ProductCard data={context.searchedProducts} /> </Link> : <>
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
            </>}
        </div>
    )
}

export default ProductPage
