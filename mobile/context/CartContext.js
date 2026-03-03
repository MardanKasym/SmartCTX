import React, { createContext, useContext, useReducer } from 'react';

const CartContext = createContext();

const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_ITEM': {
            const existing = state.find(item => item.id === action.payload.id);
            if (existing) {
                return state.map(item =>
                    item.id === action.payload.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...state, { ...action.payload, quantity: 1 }];
        }
        case 'REMOVE_ITEM':
            return state.filter(item => item.id !== action.payload);
        case 'CHANGE_QTY': {
            return state
                .map(item =>
                    item.id === action.payload.id
                        ? { ...item, quantity: item.quantity + action.payload.delta }
                        : item
                )
                .filter(item => item.quantity > 0);
        }
        case 'CLEAR_CART':
            return [];
        default:
            return state;
    }
};

export const CartProvider = ({ children }) => {
    const [cart, dispatch] = useReducer(cartReducer, []);

    const addToCart = (item) => dispatch({ type: 'ADD_ITEM', payload: item });
    const removeFromCart = (id) => dispatch({ type: 'REMOVE_ITEM', payload: id });
    const changeQty = (id, delta) => dispatch({ type: 'CHANGE_QTY', payload: { id, delta } });
    const clearCart = () => dispatch({ type: 'CLEAR_CART' });

    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, changeQty, clearCart, totalPrice, totalItems }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error('useCart must be used within CartProvider');
    return context;
};
