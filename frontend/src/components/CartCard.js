import React from 'react'

const CartCard = ({ cartItemsArray, handleQtyDec, handleQtyInc }) => {
    return (
        <>
            <table className='cart-table'>
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Qty</th>
                        <th>Total</th>
                        <th>Update</th>
                    </tr>
                </thead>
                <tbody>
                    {cartItemsArray.map(item => (
                        <tr key={item._id}>
                            <td><img src={`process.env.REACT_APP_BASE_URL/images/${item.image}`} alt={item.name} className='cart-item-img' /></td>
                            <td style={{ textTransform: "capitalize" }}>{item.name}</td>
                            <td>₹{item.price.toFixed(2)}</td>
                            <td>{item.qty}</td>
                            <td>₹{(item.qty * item.price).toFixed(2)}</td>
                            <td>
                                <div className='qty-inc-dec'>
                                    <div className='qty-btn' onClick={() => handleQtyDec(item._id)}>-</div>
                                    <span style={{ fontWeight: "bolder" }}>{item.qty}</span>
                                    <div className='qty-btn' onClick={() => handleQtyInc(item._id)}>+</div>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default CartCard
