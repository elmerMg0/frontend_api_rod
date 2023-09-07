import { configureStore } from "@reduxjs/toolkit";
import dashboardSliceReducer from '../redux/states/dashboard'
import carritoSliceReducer, { KeyLocalStorate } from '../redux/states/carrito'
import userSliceReducer from '../redux/states/user'
import deliverySlice from '../redux/states/delivery'
import categorySlice from '../redux/states/category'

//crear middleware
const persistLocalStorageMiddleware = (store) => (next) => (action) => {
    next(action);
    window.localStorage.setItem(KeyLocalStorate, JSON.stringify({orderDetail: store.getState().carrito.orderDetail}));
}

export default configureStore({
    reducer: {
        dashboard: dashboardSliceReducer,
        carrito: carritoSliceReducer,
        user: userSliceReducer,
        deliverySlice: deliverySlice,
        categories: categorySlice
    },
    middleware: [persistLocalStorageMiddleware]
})