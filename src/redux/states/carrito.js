import { createSlice } from '@reduxjs/toolkit';

const initialState = { orderDetail: []} 
const carritoSlice = createSlice({
    name: 'carrito',
    initialState: localStorage.getItem('carrito') ? JSON.parse(localStorage.getItem('carrito')) : initialState,
    reducers: {
        createCarrito: (action ) => {
            return action.payload;
        },
        updateCarrito: (state, action ) => {
            let product = action.payload;
            let exists = state.orderDetail.some( prod => prod.id === product.id);
            if(exists){
                state.orderDetail.map( prod => {
                    if(prod.id === product.id){
                        prod.cantidad += 1;
                    }
                })
                state.orderDetail = [...state.orderDetail];
                //increment quantity;
            }else{
                if( !product.cantidad ){
                    product.cantidad = 1;
                }
                state.orderDetail = [...state.orderDetail, product]
            }
            const save = {
                orderDetail: state.orderDetail
            }
            window.localStorage.setItem('carrito', JSON.stringify( save ));
        },
        decreaseQuantity: (state, action) => {
            let product = action.payload;
            state.orderDetail.map( prod => {
                if(prod.id === product.id && prod.cantidad > 1){
                    prod.cantidad -= 1;
                }
            })
            state.orderDetail = [...state.orderDetail];
            const save = {
                orderDetail: state.orderDetail
            }
            window.localStorage.setItem('carrito', JSON.stringify(save));
        },

        incrementQuantity: (state, action) => {
            let product = action.payload;
            state.orderDetail.map( prod => {
                if(prod.id === product.id && prod.cantidad < 30){
                    prod.cantidad += 1;
                }
            })
            state.orderDetail = [...state.orderDetail];
            const save = {
                orderDetail: state.orderDetail
            }
            window.localStorage.setItem('carrito', JSON.stringify(save));
        },
        deleteProduct: (state, action) => {
            let product = action.payload;
            state.orderDetail = state.orderDetail.filter(prod => prod.id !== product.id);
            const save = {
                orderDetail: state.orderDetail
            }
            window.localStorage.setItem('carrito', JSON.stringify(save))
        },
        deleteCarrito: (state) => {
            window.localStorage.removeItem('carrito');
            state.orderDetail = []
        }
    }
})

export const { createCarrito, updateCarrito, decreaseQuantity, incrementQuantity, deleteProduct, deleteCarrito} = carritoSlice.actions;
export default carritoSlice.reducer;