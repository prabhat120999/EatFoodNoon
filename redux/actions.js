// Action Types
export const ADD_ITEM = 'ADD_ITEM';
export const REMOVE_ITEM = 'REMOVE_ITEM';
export const CLEAR_CART = 'CLEAR_CART';

/**
 * Action creator to add an item to the cart.
 */
export const addItem = (item) => ({
    type: ADD_ITEM,
    payload: item, // The item that needs to be added
});

/**
 * Action creator to remove an item from the cart.
  */
export const removeItem = (item) => ({
    type: REMOVE_ITEM,
    payload: item, // The item that needs to be removed
});

/**
 * Action creator to clear all items from the cart.
 */
export const clearCart = () => ({
    type: CLEAR_CART, // Clear the entire cart
});
