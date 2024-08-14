import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MainContext } from '../context/MainContext';
import { addToCart, removeFromCart } from '../redux/cartSlice';
import { useSelector, useDispatch } from 'react-redux';
import { addingToCart, removingFromCart } from '../apis';

const SpecificProductPage = () => {
    const { products, token } = useContext(MainContext);
    const params = useParams();
    const cartItems = useSelector((state) => state.cart.cartItems);
    const dispatch = useDispatch();

    useEffect(() => {
        console.log(cartItems, "cartItems check");
    }, [cartItems]);

    // Ensure the products array is not undefined or empty
    if (!products || products.length === 0) {
        return <div>Loading...</div>;
    }

    // Find the product based on URL params
    const product = products.find(item => item.name === params.product);

    // If the product is not found, return an error message
    if (!product) {
        return <div>Product not found</div>;
    }

    const { _id, name, description, price, image } = product;

    // Get the cart items from the Redux store
    const currentQty = cartItems[_id] || 0; // Get quantity or default to 0


    const handleAddToCart = async () => {
        dispatch(addToCart({ id: _id })); // Add or increment quantity in the Redux state
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
