import { configureStore } from '@reduxjs/toolkit'
import signupReducer from './feature/userCred/UserCredsSlice'


export const store = configureStore({
    reducer: {
        signup: signupReducer,
    },
})


