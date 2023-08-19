import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    state: false,
    quantity: 0
};
const KeyLocalStorateDelivery = 'delivery';
const deliverySlice = createSlice({
    name: 'delivery',
    initialState: localStorage.getItem(KeyLocalStorateDelivery)? JSON.parse(localStorage.getItem(KeyLocalStorateDelivery)) : initialState,
    reducers: {
        updateQuantity: (store, action) => {
            const newState = {...store, ...action.payload};
            localStorage.setItem(KeyLocalStorateDelivery, JSON.stringify(newState))
            return newState;
        },
        updateDelivery: (store, action) => {
            const newState = {...store, ...action.payload};
            localStorage.setItem(KeyLocalStorateDelivery, JSON.stringify(newState))
            return newState;
        }
    }
})
export default deliverySlice.reducer
export const { updateQuantity, updateDelivery } = deliverySlice.actions;