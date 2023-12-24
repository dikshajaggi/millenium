export const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            console.log(action, "action")
            return { ...state, cart: [...state.cart, action.payload] }
        case 'REMOVE_FROM_CART':
            return { ...state, cart: state.cart.filter(item => item.id !== action.payload.id) }
        default:
            return state
    }
}