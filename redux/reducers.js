import { ADD_ITEM, REMOVE_ITEM, CLEAR_CART } from './actions';

/**
 * Initial state for the cart, which starts with an empty items array.
 */
const initialState = {
    items: [],
};

/**
 * Cart reducer that handles state changes based on different actions.
 */
const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        // Action to add an item to the cart
        case ADD_ITEM:
            return {
                ...state,
                items: [...state.items, { ...action.payload }], // Add the new item to the existing items
            };

        // Action to remove an item from the cart by matching the item's ID
        case REMOVE_ITEM:
            return {
                ...state,
                items: state.items.filter(item => item.id !== action.payload), // Remove item based on ID
            };

        // Action to clear all items from the cart
        case CLEAR_CART:
            return {
                ...state,
                items: [], // Reset the items array to empty
            };

        // Default case if no recognized action is dispatched
        default:
            return state;
    }
};

export default cartReducer;
