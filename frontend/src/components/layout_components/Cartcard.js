import React, { useContext, useEffect, useState } from 'react'
import { MainContext } from '../../context/MainContext'
import { useCart } from '../../context/cartContext'

export const Counter = ({ id, n_id }) => {
    console.log(id, "checking id")
    const context = useContext(MainContext);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const fetchQuantity = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/cart/product-quantity/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': context.userLoginToken,
                    },
                });
                const data = await response.json();
                console.log(data, "productidqtyres");
                setQuantity(data.quantity);
            } catch (error) {
                console.error('Error fetching product quantity:', error);
            }
        };
        fetchQuantity();
        // eslint-disable-next-line
    }, [id]);

    const incrementQuantity = async () => {
        try {
            const newQuantity = quantity + 1;
            await updateQuantity(newQuantity);
        } catch (error) {
            console.error('Error updating product quantity:', error);
        }
    };

    const decrementQuantity = async () => {
        try {
            if (quantity > 0) {
                const newQuantity = quantity - 1;
                await updateQuantity(newQuantity);
            }
        } catch (error) {
            console.error('Error updating product quantity:', error);
        }
    };

    const updateQuantity = async (newQuantity) => {
        try {
            const response = await fetch(`http://localhost:8000/api/cart/update-cart/${n_id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': context.userLoginToken,
                },
                body: JSON.stringify({ quantity: newQuantity })
            });
            if (!response.ok) {
                throw new Error('Failed to update quantity');
            }
            setQuantity(newQuantity);
            context.setQtyUpdated(newQuantity);
        } catch (error) {
            console.error('Error updating quantity:', error);
            // Handle error
        }
    };



    return (
        <div className='d-flex'>
            <span className='cursorpointer' onClick={incrementQuantity}>+</span>
            {quantity}
            <span className='cursorpointer' onClick={decrementQuantity}>-</span>
        </div>
    )
}

const Cartcard = ({ data }) => {
    console.log("info check", data)
    const context = useContext(MainContext)
    const { cartState, dispatch } = useCart()

    const handleCartRemove = () => {
        dispatch({ type: "REMOVE_FROM_CART", payload: data.product })
    }

    const deleteProducts = async () => {
        const info = await fetch(`https://millenium-orthodontics.onrender.com/api/cart/delete-from-cart/${data.product._id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': context.userLoginToken
            }
        })

        if (info.ok) {
            handleCartRemove()
            context.setDelete(context.del + 1)
            window.location.reload()
        }
    }
    console.log(cartState, "checking redux state")
    return (
        <div>
            <div className="card mb-3 cart-card-wrapper">
                <div className="row g-0">
                    <div className="col-md-4 cart-card-colmd4">
                        <img src={data.product.cloudinaryImage} className="img-fluid rounded-start cart-card-img" alt="productimg" />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h6 className="card-title text-capitalize text-center">{data.product.name}</h6>
                            <h6 className="card-title text-capitalize">Rs.{data.product.price}</h6>
                            <p className="card-text text-capitalize  text-success">In Stock</p>
                            <div className='d-flex justify-content-between align-items-center cart-card-width'>
                                {console.log(data, "cartcarddatacheck")}
                                <Counter id={data.product._id} n_id={data.product.id} />
                                <div className="text-danger cursorpointer" onClick={deleteProducts}>Delete</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cartcard
// const setQuantity = async (newQuantity) => {
// const requestBody = {
//     quantityChange: quantityChange
// };
// try {
//     const response = await fetch(`https://millenium-orthodontics.onrender.com/api/cart/update-cart/${id}`, {
//         method: 'PATCH',
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': context.userLoginToken
//         },
//         body: JSON.stringify(requestBody)
//     });
//     if (!response.ok) {
//         throw new Error('Failed to update quantity');
//     }
//     context.setQtyUpdated(context.qtyUpdated + 1);
// } catch (error) {
//     console.error('Error updating quantity:', error);
// }
//     const requestBody = { quantity: newQuantity }
//     try {
//         const response = await fetch(`http://localhost:8000/api/cart/update-cart/${id}`, {
//             method: 'PATCH',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': context.userLoginToken,
//             },
//             body: JSON.stringify(requestBody)
//         });
//         if (!response.ok) {
//             throw new Error('Failed to update quantity');
//         }
//         context.setQtyUpdated(context.qtyUpdated + 1);
//     } catch (error) {
//         console.error('Error updating quantity:', error);
//         // Handle error
//     }
// };

// const [qty, setQty] = useState(quantity);

// const inc = () => {
//     const param = qty + 1
//     setQty(qty + 1);
//     setQuantity(param);
// };

// const dec = () => {
//     const newQty = qty > 1 ? qty - 1 : 1;
//     setQty(newQty);
//     setQuantity(newQty);
// };