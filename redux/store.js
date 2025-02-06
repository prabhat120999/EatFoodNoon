import { createStore, combineReducers } from 'redux';
import cartReducer from './reducers';

/**
 * The rootReducer combines all individual reducers into one.
 * Here we only have one reducer, 'cart', for managing the shopping cart state.
 */
const rootReducer = combineReducers({
    cart: cartReducer, // Combines the cart reducer
});

/**
 * The Redux store is created using the rootReducer.
 * It holds the state of the app and allows dispatching actions to modify the state.
 */
export const store = createStore(rootReducer);
