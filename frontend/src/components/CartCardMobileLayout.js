import React from 'react'

const CartCardMobileLayout = ({ cartItemsArray, handleQtyDec, handleQtyInc }) => {
    return (
        <>
            <div className='cart-cards'>
                {cartItemsArray.map(item => (
                    <div className='cart-card' key={item._id}>
                        <img src={`http://localhost:5000/images/${item.image}`} alt={item.name} className='cart-card-img' />
                        <div className='cart-card-details'>
                            <h3>{item.name}</h3>
                            <p>Price: ₹{item.price.toFixed(2)}</p>
                            <p>Quantity: {item.qty}</p>
                            <p>Total: ₹{(item.qty * item.price).toFixed(2)}</p>
                            <button className='remove-btn' onClick={() => handleQtyDec(item._id)}>Dec</button>
                            <button className='remove-btn' onClick={() => handleQtyInc(item._id)}>Inc</button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default CartCardMobileLayout
