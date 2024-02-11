export const cartReducer = (state, action) => {
    switch (action.type) {
        case "SET_INITIAL_STATE":
            return { ...state, cart: [action.payload] };
        case 'ADD_TO_CART':
            console.log(action, "action")
            return { ...state, cart: [...state.cart, action.payload] }
        case 'REMOVE_FROM_CART':
            console.log(state.cart, "checking delete redux", action.payload)
            return { ...state, cart: state.cart.filter(item => item.product.id !== action.payload.id) }
        case 'CLEAR_CART':
            return { ...state, cart: [] }
        default:
            return state
    }
}