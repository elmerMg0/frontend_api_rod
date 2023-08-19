import { createSlice } from '@reduxjs/toolkit';
import { typeDish } from '../../utils/constans';

const initialState = { orderDetail: []} 
export const KeyLocalStorate = 'carrito'

const validateStock = (product, productStore=null) => {
    if(product.tipo !== typeDish.BEBIDA) return false;
    if(!productStore) return product.stock === 0; 
    return  productStore.cantidad >= product.stock;
}

const carritoSlice = createSlice({
    name: 'carrito',
    initialState: localStorage.getItem(KeyLocalStorate) ? JSON.parse(localStorage.getItem(KeyLocalStorate)) : initialState,
    reducers: {
        createCarrito: (action ) => {
            return action.payload;
        },
        updateCarrito: (state, action ) => {
            const product = action.payload;
            const indexProduct = state.orderDetail.findIndex(prod => prod.id === product.id);
            if(indexProduct !== -1){
                if(validateStock( product, state.orderDetail[indexProduct]))return
                state.orderDetail[indexProduct].cantidad++;
            }else{
                if(validateStock(product))return
                state.orderDetail = [...state.orderDetail, {...product, cantidad: 1}];
            }
        },
        decreaseQuantity: (state, action) => {
            const { id, cantidad } = action.payload;
            const indexProduct = state.orderDetail.findIndex(prod => prod.id == id)
            if( indexProduct !== -1 && cantidad > 1 ) state.orderDetail[indexProduct].cantidad--;
        },

        incrementQuantity: (state, action) => {
            const product = action.payload;
            const indexProduct = state.orderDetail.findIndex(prod => prod.id == product.id)
            if(validateStock(product, state.orderDetail[indexProduct]))return
            if( indexProduct !== -1) state.orderDetail[indexProduct].cantidad++;
        },
        deleteProduct: (state, action) => {
            const product = action.payload;
            state.orderDetail = state.orderDetail.filter(prod => prod.id !== product.id);
        },
        deleteCarrito: (state) => {
            window.localStorage.removeItem(KeyLocalStorate);
            state.orderDetail = []
        }
    }
})

export const { createCarrito, updateCarrito, decreaseQuantity, incrementQuantity, deleteProduct, deleteCarrito} = carritoSlice.actions;
export default carritoSlice.reducer;