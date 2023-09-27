import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    email: ""
}

export const authSlice = createSlice({
    name: 'userAuth',
    initialState,
    reducers: {
            setAuth: (state, action) => {
                state.user = action.payload;
            },
            setEmail: (state, action) => {
                state.email = action.payload;
            }
    }
})

export const { setAuth, setEmail } = authSlice.actions;
export default authSlice.reducer;