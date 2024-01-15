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
    const [products, setProducts] = useState([{
        id: "1",
        name: "metal brackets kit",
        description: "desc desc desc desc desc",
        price: 1600,
        cloudinaryImage: "https://res.cloudinary.com/df43msegk/image/upload/v1703080291/website-products/metal-bracket-kit-2.jpg",
        stock: 60,
        category: "brackets"
    }, {
        id: "2",
        name: "arch wire",
        description: "desc desc desc desc desc",
        price: 2000,
        cloudinaryImage: "https://res.cloudinary.com/df43msegk/image/upload/v1703143845/website-products/ss_wire_2.png",
        stock: 40,
        category: "wires and springs"
    }, {
        id: "3",
        name: "archwire another",
        description: "desc desc desc",
        price: 2200,
        cloudinaryImage: "https://res.cloudinary.com/df43msegk/image/upload/v1703143845/website-products/ss_wire_2.png",
        stock: 50,
        category: "wires and springs"
    }, {
        id: "4",
        name: " brackets kit",
        description: "desc  desc desc desc",
        price: 2000,
        cloudinaryImage: "https://res.cloudinary.com/df43msegk/image/upload/v1703080291/website-products/metal-bracket-kit-2.jpg",
        stock: 60,
        category: "brackets"
    }])
    const [searched, setSearched] = useState(false)
    const getProducts = async () => {
        const data = await fetch("https://millenium-orthodontics.onrender.com/api/products")
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
        // eslint-disable-next-line
    }, [context.searched])

    return (
        <div className="d-flex justify-content-center align-items-center res-products" >
            {searched ? <Link className='style-link' to={`/product/${context.searchedProducts.name}/${context.searchedProducts._id}`} key={context.searchedProducts._id}> <ProductCard data={context.searchedProducts} /> </Link> : products.map(item => {
                return (
                    <Link className='style-link' to={`/product/${item.name}/${item._id}`} key={item._id}> <ProductCard data={item} /> </Link>
                )
            })}
        </div>
    )
}

export default Products
