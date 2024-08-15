import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MainContext } from '../context/MainContext';
import { useDispatch, useSelector } from 'react-redux';
import { handleAddToCart, handleQtyDec } from '../utils/AddRemoveCartItems';

const SpecificProductPage = () => {
    const dispatch = useDispatch();
    const { products, token } = useContext(MainContext);
    const params = useParams();
    const cartItems = useSelector((state) => state.cart.cartItems);
    const [showisLoggedIn, setShowisLoggedIn] = useState(false)

    useEffect(() => {
        console.log(cartItems, "cartItems check");
    }, [cartItems]);

    // Ensure the products array is not undefined or empty
    if (!products || products.length === 0) {
        return <div>Loading...</div>;
    }

    // Find the product based on URL params
    const product = products.find(item => item.name === params.product);
    if (!product) {
        return <div>Product not found</div>;
    }

    const { _id, name, description, price, image } = product;
    const currentQty = cartItems[_id] || 0; // Get quantity or default to 0

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
                {currentQty === 0 ? (
                    <button className='single-pro-btn' onClick={() => handleAddToCart(_id, setShowisLoggedIn, dispatch)}>Add to Cart</button>
                ) : (
                    <div style={{ display: "flex" }}>
                        <button className='single-pro-btn' onClick={() => handleQtyDec(_id, currentQty, dispatch)}>Dec</button>
                        <span>{currentQty}</span>
                        <button className='single-pro-btn' onClick={() => handleAddToCart(_id, setShowisLoggedIn, dispatch)}>Inc</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SpecificProductPage;
