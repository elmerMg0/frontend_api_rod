import { createSlice } from "@reduxjs/toolkit";

const initialState = ''

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState: localStorage.getItem('view') ? localStorage.getItem('view'): initialState,
    reducers: {
        createView: (state, action) => {
            localStorage.setItem('view',action.payload);
            return action.payload;
        },
        updateView: (state, action) => {
            const result = {...state, ...action.payload}
            localStorage.setItem('view', action.payload);
            return result;
        }
    }
})
export const { createView, updateView} = dashboardSlice.actions;
export default dashboardSlice.reducer;