import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { MainContext } from '../context/MainContext'
import { addToCart, removeFromCart } from '../redux/cartSlice'
import { useSelector, useDispatch } from 'react-redux';


const SpecificProductPage = () => {
    const {products} = useContext(MainContext)
    const params = useParams()
    const product = products.find(item => item.name === params.product)
    const {name, description, price, image} = product
    const cartItems = useSelector((state) => state.cart.cartItems)
    const currentCartItem = cartItems.find(item => item.name === params.product)
    const dispatch = useDispatch()
  
    const handleAddToCart = () => {
        dispatch(addToCart(product))
    }

    const handleQtyDec = () => {
        dispatch(removeFromCart(product))
    }

    useEffect(() => {
        console.log(cartItems, "cartitems check")
    }, [cartItems])

    return (
        <div className='single-pro-main'>
        <div className='single-pro-div1'>
            <img src={`http://localhost:5000/images/${image}`} alt="productimg" />
        </div>
        <div className='single-pro-div2'>
            <h1 className='single-pro-label'>{name}</h1>
            <p className='single-pro-desc'>{description}</p>
            <div className='single-pro-price'>
                <h6 className='single-pro-price-h6'>Price:</h6>
                <h6 className='single-pro-price-h6'>{price}</h6>
            </div>
            {!currentCartItem ? <button className='single-pro-btn' onClick={handleAddToCart}>Add to Cart</button>
            : <div style={{display: "flex"}}>
                <button className='single-pro-btn' onClick={handleQtyDec}>dec</button>
                <span onClick={handleAddToCart}>{currentCartItem.qty}</span>
                <button className='single-pro-btn' onClick={handleAddToCart}>inc</button>
            </div>
            }
        </div>
        </div>
    )
}

export default SpecificProductPage
