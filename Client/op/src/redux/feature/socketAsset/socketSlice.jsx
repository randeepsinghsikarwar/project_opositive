import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    users : []
}

export const socketSlice = createSlice({
    name: 'socketSlice',
    initialState, 
    reducers: {
        newUser: (state, action) => {
            return {
                ...state,
                users: action.payload
            };
            
        },
        disconnectUser: (state, action) => {
            return {
                ...state,
                users: action.payload
            }
        }
    }
})

export const {newUser, disconnectUser}= socketSlice.actions;
export default socketSlice.reducer;