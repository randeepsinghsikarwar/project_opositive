import { configureStore } from '@reduxjs/toolkit'
import navBarReducer from './feature/navbar/NavbarSlice'
import signupReducer from './feature/userCred/UserCredsSlice'


export const store = configureStore({
    reducer: {
        navBar : navBarReducer,
        signup: signupReducer,

    },
})


