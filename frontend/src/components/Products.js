import React, { useContext, useEffect, useState } from 'react'
import ProductCard from './layout_components/ProductCard'
import "./styles.scss"
import { Link } from 'react-router-dom'
import { MainContext } from '../context/MainContext'

// const getRandomProducts = () => {
//     // Shuffle the products array and get the first 8 items
//     const shuffledProducts = [...products].sort(() => 0.5 - Math.random());
//     const selectedProducts = shuffledProducts.slice(0, 8);
//     return selectedProducts;
// };

// const randomProducts = getRandomProducts();

const Products = () => {
    const context = useContext(MainContext)
    const [products, setProducts] = useState([])
    const [searched, setSearched] = useState(false)
    const getProducts = async () => {
        const data = await fetch("http://localhost:8000/api/products")
        const jsonData = await data.json()
        const slicedArr = jsonData.slice(0, 8)
        setProducts(slicedArr)
    }
    useEffect(() => {
        getProducts()
    }, [])

    useEffect(() => {
        if (context.searchedProducts !== null) setSearched(true)
        if (context.searched === false) setSearched(false)
    }, [context.searched])

    return (
        <div className="d-flex justify-content-center align-items-center" style={{ padding: "0 2vw", margin: "4vh auto", flexWrap: "wrap", flexBasis: "33.33%" }}>
            {searched ? <Link className='style-link' to={`/product/${context.searchedProducts.name}/${context.searchedProducts._id}`} key={context.searchedProducts._id}> <ProductCard data={context.searchedProducts} /> </Link> : products.map(item => {
                return (
                    <Link className='style-link' to={`/product/${item.name}/${item._id}`} key={item._id}> <ProductCard data={item} /> </Link>
                )
            })}
        </div>
    )
}

export default Products
