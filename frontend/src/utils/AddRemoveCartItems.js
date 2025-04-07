import { addToCart, removeFromCart } from '../redux/cartSlice';
import { addingToCart, removingFromCart } from '../apis';

export const handleAddToCart = async (_id, dispatch, onLoginRequired) => {
    const token = localStorage.getItem("token");

    if (!token) {
        if (onLoginRequired) onLoginRequired();
        return;
    }

    try {
        dispatch(addToCart({ id: _id })); // Update Redux store

        // Pass token directly to API function
        await addingToCart(_id, token);
    } catch (error) {
        console.error("Error adding item to cart:", error);
    }
};


export const handleQtyDec = async (_id, currentQty, dispatch) => {
    const token = localStorage.getItem("token")
    if (currentQty > 0) {
        dispatch(removeFromCart({ id: _id })); // Decrement quantity in the Redux state
        if (token) {
            await removingFromCart(_id, { headers: { token } }); // Sync with backend
        }
    }
};