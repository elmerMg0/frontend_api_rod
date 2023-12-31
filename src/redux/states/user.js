import { createSlice } from "@reduxjs/toolkit";
import { persistLocalStorage } from "../../utilities/localStorage.utility";
const initialState = {
    username: '',
    accessToken: '',
    periodUser: ''
}

export const UserKey = 'user';
const userSlice = createSlice( {
    name: 'user',
    initialState: localStorage.getItem(UserKey) ? JSON.parse(localStorage.getItem(UserKey)) : initialState,
    reducers: {
        createUser: (state, action) => {
            persistLocalStorage(UserKey , action.payload)
            return action.payload;
        }, 
        updateUser: ( state, action) => {
            const result = {...state, ...action.payload}
            persistLocalStorage(UserKey, result);
            return result;
        } , 
        resetUser: () => {
            return initialState;
        }
       }
})

export const { createUser, updateUser, resetUser } = userSlice.actions;
export default userSlice.reducer; 