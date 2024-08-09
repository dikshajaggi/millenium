import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { MainContext } from '../context/MainContext'
import productImg from "../assests/products/plier.jpeg"

const SpecificProductPage = () => {
    const {products} = useContext(MainContext)
    const params = useParams()
    console.log(params, "params")
    const product = products.find(item => item.name === params.product)
    const cartItems = []
    console.log(product, "product")

    const addToCart = () => {
        cartItems.push(product.name)
        console.log(cartItems.length, "cartItems.length")
    }

    return (
        <div className='single-pro-main'>
        <div className='single-pro-div1'>
            <img src={productImg} alt="productimg" />
        </div>
        <div className='single-pro-div2'>
            <h1 className='single-pro-label'>{product.name}</h1>
            <p className='single-pro-desc'>{product.description}</p>
            <div className='single-pro-price'>
                <h6 className='single-pro-price-h6'>Price:</h6>
                <h6 className='single-pro-price-h6'>{product.price}</h6>
            </div>
            {cartItems.length === 0 ? <button className='single-pro-btn' onClick={addToCart}>Add to Cart</button>
            : <button className='single-pro-btn' onClick={addToCart}>Quantity</button>
            }
        </div>
        </div>
    )
}

export default SpecificProductPage
