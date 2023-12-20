import React, { useEffect, useState } from 'react'
import ProductCard from './layout_components/ProductCard'
import "./styles.scss"
import { Link } from 'react-router-dom'

// const getRandomProducts = () => {
//     // Shuffle the products array and get the first 8 items
//     const shuffledProducts = [...products].sort(() => 0.5 - Math.random());
//     const selectedProducts = shuffledProducts.slice(0, 8);
//     return selectedProducts;
// };

// const randomProducts = getRandomProducts();

const Products = () => {
    const [products, setProducts] = useState([])
    const getProducts = async () => {
        const data = await fetch("http://localhost:8000/api/products")
        const jsonData = await data.json()
        setProducts(jsonData)
    }
    useEffect(() => {
        getProducts()
    }, [])
    return (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 2vw", margin: "4vh auto", flexWrap: "wrap", flexBasis: "33.33%" }}>
            {products.map(item => {
                return (
                    <Link className='style-link' to={`/product/${item.name}/${item._id}`} key={item._id}> <ProductCard data={item} /> </Link>
                )
            })}
        </div>
    )
}

export default Products
