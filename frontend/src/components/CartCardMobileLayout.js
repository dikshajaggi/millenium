import React from 'react'

const CartCardMobileLayout = ({ cartItemsArray, handleQtyDec, handleQtyInc }) => {
    return (
        <>
            <div className='cart-cards'>
                {cartItemsArray.map(item => (
                    <div className='cart-card' key={item._id}>
                        <img src={`${process.env.REACT_APP_BASE_URL}/images/${item.image}`} alt={item.name} className='cart-card-img' />
                        <div className='cart-card-details'>
                            <h3>{item.name}</h3>
                            <p>Price: ₹{item.price.toFixed(2)}</p>
                            <p>Quantity: {item.qty}</p>
                            <p>Total: ₹{(item.qty * item.price).toFixed(2)}</p>
                            <div className='qty-inc-dec'>
                                <div className='qty-btn' onClick={() => handleQtyDec(item._id)}>-</div>
                                <span style={{ fontWeight: "bolder" }}>{item.qty}</span>
                                <div className='qty-btn' onClick={() => handleQtyInc(item._id)}>+</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default CartCardMobileLayout
