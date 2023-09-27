import { configureStore } from '@reduxjs/toolkit'
import navBarReducer from './feature/navbar/NavbarSlice'
import signupReducer from './feature/userCred/UserCredsSlice'
import authReducer from './feature/authentication/AuthSlice'


export const store = configureStore({
    reducer: {
        navBar : navBarReducer,
        signup: signupReducer,
        userAuth: authReducer
        // authentication: authReducer,

    },
})


