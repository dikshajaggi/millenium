import React, { useContext, useState } from 'react'
import { MainContext } from '../context/MainContext';
import { useSelector } from 'react-redux';
import { placeorder } from '../apis';
import { useNavigate } from 'react-router-dom';
import PlaceOrderForm from '../components/PlaceOrderForm';
import CartTotal from '../components/CartTotal';
import { calculateCartTotal } from '../utils/CartTotalCalc';

const PlaceOrder = () => {
    const navigate = useNavigate();
    const { products, token, setOrderPlaced } = useContext(MainContext);
    console.log(token, "token checkkk")
    const cartItems = useSelector((state) => state.cart.cartItems);
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        city: "",
        state: "",
        pincode: "",
        phone: ""
    });

    const cartItemsArray =cartItems ? Object.keys(cartItems)
        .map(id => {
            const product = products.find(product => product._id === id);
            if (product) {
                return { ...product, qty: cartItems[id] };
            }
            return null;
        })
        .filter(item => item !== null) : [];

    const placeOrder = async () => {
        // Check if all required fields are filled
        if (
            data.firstName !== "" &&
            data.lastName !== "" &&
            data.email !== "" &&
            data.street !== "" &&
            data.city !== "" &&
            data.state !== "" &&
            data.pincode !== "" &&
            data.phone !== ""
        ) {
            // Check if the cartItems object is not empty
            if (Object.keys(cartItems).length > 0) {
                const { finalAmount } = calculateCartTotal(cartItemsArray)
                const orderData = {
                    address: data,
                    items: cartItemsArray,
                    amount: finalAmount
                };

                try {
                    const response = await placeorder(orderData, { headers: { token: token } });
                    console.log(response, "res check");

                    if (response.data.success) {
                        setOrderPlaced(true);
                        alert("Order placed successfully");
                        navigate("/");
                    } else alert("Failed to place order. Please try again.")
                } catch (error) {
                    console.error("Error placing order:", error);
                    alert("Failed to place order. Please try again.");
                }
            } else {
                alert("Cart is empty");
            }
        } else {
            alert("Please fill all the fields");
        }
    };

    return (
        <div className="checkout-container">
            <PlaceOrderForm data={data} setData={setData} />
            <CartTotal cartItemsArray={cartItemsArray} placeOrder={placeOrder} />
        </div>
    );
}

export default PlaceOrder;
