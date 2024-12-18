import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MainContext } from '../context/MainContext';
import { useDispatch, useSelector } from 'react-redux';
import { handleAddToCart, handleQtyDec } from '../utils/AddRemoveCartItems';
import LoginModal from '../components/LoginModal';

const SpecificProductPage = () => {
    const dispatch = useDispatch();
    const { products } = useContext(MainContext);
    const params = useParams();
    const cartItems = useSelector((state) => state.cart.cartItems);
    const [showModal, setShowModal] = useState(false);

    const onLoginRequired = () => {
        setShowModal(true);
    };

    useEffect(() => {
        console.log(cartItems, "cartItems check");
    }, [cartItems]);

    // Ensure the products array is not undefined or empty
    if (!products || products.length === 0) {
        return <div>Loading...</div>;
    }

    // Find the product based on URL params
    const product = products.find(item => item.name_id === params.product);
    if (!product) {
        return <div>Product not found</div>;
    }

    const { _id, name, description, price, image } = product;
    console.log(cartItems, "cart items")
    const currentQty = cartItems ? cartItems[_id] || 0 : 0; // Get quantity or default to 0

    return (
        <div className='single-pro-main'>
            <div className='single-pro-div1'>
                <div className='image-container'>
                    <img src={`${process.env.REACT_APP_BASE_URL}/images/${image}`} alt="productimg" />
                </div>
            </div>
            <div className='single-pro-div2'>
                <h3 className='single-pro-label'>{name}</h3>
                <p className='single-pro-desc'>{description}</p>
                <div className='single-pro-price'>
                    <h6 className='single-pro-price-h6'>Price: ₹</h6>
                    <h6 className='single-pro-price-h6' style={{ marginLeft: "4px" }}>{price}</h6>
                </div>
                <LoginModal show={showModal} onClose={() => setShowModal(false)} />
                {currentQty === 0 ? (
                    <button className='single-pro-btn' onClick={() => handleAddToCart(_id, dispatch, onLoginRequired)}>Add to Cart</button>
                ) : (
                    <div className='qty-inc-dec'>
                        <div className='qty-btn' onClick={() => handleQtyDec(_id, currentQty, dispatch)}>-</div>
                        <span style={{ fontWeight: "bolder" }}>{currentQty}</span>
                        <div className='qty-btn' onClick={() => handleAddToCart(_id, dispatch)}>+</div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SpecificProductPage;
