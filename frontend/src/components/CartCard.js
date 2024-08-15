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
                            <td><img src={`http://localhost:5000/images/${item.image}`} alt={item.name} className='cart-item-img' /></td>
                            <td>{item.name}</td>
                            <td>₹{item.price.toFixed(2)}</td>
                            <td>{item.qty}</td>
                            <td>₹{(item.qty * item.price).toFixed(2)}</td>
                            <td>
                                <button className='remove-btn' onClick={() => handleQtyDec(item._id)}>Dec</button>
                                <button className='remove-btn' onClick={() => handleQtyInc(item._id)}>Inc</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default CartCard
