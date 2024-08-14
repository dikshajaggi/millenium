import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MainContext } from '../context/MainContext';
import { addToCart, removeFromCart } from '../redux/cartSlice';
import { useSelector, useDispatch } from 'react-redux';
import { addingToCart, removingFromCart } from '../apis';

const SpecificProductPage = () => {
    const { products, token } = useContext(MainContext);
    const params = useParams();
    
    // Find the product based on URL params
    const product = products.find(item => item.name === params.product);
    console.log(product, "product", products, params)
    const { _id, name, description, price, image } = product;

    // Get the cart items from the Redux store
    const cartItems = useSelector((state) => state.cart.cartItems);
    const currentQty = cartItems[_id] || 0; // Get quantity or default to 0

    const dispatch = useDispatch();

    const handleAddToCart = async () => {
        if (!cartItems[_id]) {
            dispatch(addToCart({ id: _id })); // Add to cart in the Redux state
        } else {
            dispatch(addToCart({ id: _id })); // Increment quantity in the Redux state
        }
        if (token) {
            await addingToCart(_id, { headers: { token } }); // Sync with backend
        }
    };

    const handleQtyDec = async () => {
        if (currentQty > 0) {
            dispatch(removeFromCart({ id: _id })); // Decrement quantity in the Redux state
            if (token) {
                await removingFromCart(_id, { headers: { token } }); // Sync with backend
            }
        }
    };

    useEffect(() => {
        console.log(cartItems, "cartItems check");
    }, [cartItems]);

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
                    <button className='single-pro-btn' onClick={handleAddToCart}>Add to Cart</button>
                ) : (
                    <div style={{ display: "flex" }}>
                        <button className='single-pro-btn' onClick={handleQtyDec}>Dec</button>
                        <span>{currentQty}</span>
                        <button className='single-pro-btn' onClick={handleAddToCart}>Inc</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SpecificProductPage;
