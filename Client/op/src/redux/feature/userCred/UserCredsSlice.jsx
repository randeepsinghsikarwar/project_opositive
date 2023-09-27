import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    email: "",
    password: "",
    cnfPassword: ""
}

export const signupSlice = createSlice({
    name: 'signup',
    initialState,
    reducers: {
        emailChanged: (state, action) => {
            state.email = action.payload;
        },
        passwordChanged: (state, action) => {
            state.password = action.payload;
        },
        cnfPasswordChanged: (state, action) => {
            state.cnfPassword = action.payload;
        }

    }
})

export const {emailChanged, passwordChanged, cnfPasswordChanged} = signupSlice.actions;
export default signupSlice.reducer;