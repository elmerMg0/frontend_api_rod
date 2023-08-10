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
      //verificar que si ya hay un producto igual, eliminar el anterior y agregar el reciente
      const payload = action.payload;
      let arrayFilter = state;
      for(let i = 0; i <  payload.length; i++){
        let exists = state.some( prod => prod.id === payload[i].id) ;
        if(exists){
          arrayFilter = arrayFilter.filter( prod => prod.id !== payload[i].id)  
        }
      }
      /* Concat  */
      const concatArray = [...arrayFilter].concat(action.payload);
      persistLocalStorage(keyCarritoUser, concatArray);
      return concatArray;
    },

    incrementQuantity: (state, action) => {
      state.map( prod => {
        if(prod.id === action.payload){
          prod.cantidad += 1;
        }
        return prod;
      })
      persistLocalStorage(keyCarritoUser, state);
      return state;
    }
    ,decrementQuantity: (state, action) => {
      state.map( prod => {
        if(prod.id === action.payload){
          prod.cantidad -= 1;
        }
        return prod;
      })
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
