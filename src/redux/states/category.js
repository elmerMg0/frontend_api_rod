import { createSlice } from "@reduxjs/toolkit";
import { persistLocalStorage } from "../../utilities/localStorage.utility";

const initialState = [];
const keyLocalStorage = 'categories';
const categoriesSlice = createSlice({
    name: 'categories',
    initialState: localStorage.getItem(keyLocalStorage) ? JSON.parse(localStorage.getItem(keyLocalStorage)): initialState,
    reducers: {
        addCategories: (store, action) => {
            const categories = action.payload;
            persistLocalStorage(keyLocalStorage, categories)
            return action.payload;
        }
    }
})
export default categoriesSlice.reducer;
export const { addCategories} = categoriesSlice.actions;