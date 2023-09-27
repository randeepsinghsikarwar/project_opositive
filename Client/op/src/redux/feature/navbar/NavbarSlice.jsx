import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    isOpened: false,
}

export const navBarSlice = createSlice({
    name: 'navBar',
    initialState,
    reducers: {
        openClose: (state) =>{
            state.isOpened = !state.isOpened;
        },
    }
})

export const { openClose } = navBarSlice.actions;
export default navBarSlice.reducer;