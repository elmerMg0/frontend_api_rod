import { createSlice } from "@reduxjs/toolkit";
import { persistLocalStorage } from "../../utilities/localStorage.utility";

const initialState =  [];

export const keyCarritoUser = "carritoUser";

const carritoUser = createSlice({
  name: "carritoUser",
  initialState: localStorage.getItem(keyCarritoUser)
    ? JSON.parse(localStorage.getItem(keyCarritoUser))
    : initialState,
  reducers: {
    /* Concatenamos los arreglos, despues actualizamos el estado global */
    addProductCarrito: (state, action) => {
      const products = action.payload;

      const concatArray = products.reduce((map, value) => {
        const indexProduct = map.findIndex(prod => prod.id === value.id);
        console.log(map)
        if(indexProduct !== -1){
          map[indexProduct].cantidad = value.cantidad;
        }else{
          map.push(value); 
        }
        return map;
      }, state)

      persistLocalStorage(keyCarritoUser, concatArray);
      return concatArray;
    },

    incrementQuantity: (state, action) => {
      const  id  = action.payload;
      const indexProduct = state.findIndex(prod => prod.id === id)
      if( indexProduct !== -1){
        state[indexProduct].cantidad ++;
      }
      persistLocalStorage(keyCarritoUser, state);
      return state;

   /*    state.map( prod => {
        if(prod.id === action.payload){
          prod.cantidad += 1;
        }
        return prod;
      }) */
    }
    ,decrementQuantity: (state, action) => {
      const  id  = action.payload;
      const indexProduct = state.findIndex(prod => prod.id === id)
      if( indexProduct !== -1){
        state[indexProduct].cantidad ++;
      }
      persistLocalStorage(keyCarritoUser, state);
      return state;
    },
    deleteProduct: (state, action) => {
      const filter = state.filter( prod => prod.id !== action.payload);
      persistLocalStorage(keyCarritoUser, filter);
      return filter;
    },
    deleteCarritoUser: (state, action) => {
      window.localStorage.removeItem(keyCarritoUser);
      return [];
    }
  
  },
});

export const { addProductCarrito, incrementQuantity, decrementQuantity, deleteProduct, deleteCarritoUser} = carritoUser.actions;
export default carritoUser.reducer;
