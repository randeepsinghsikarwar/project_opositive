import { configureStore } from '@reduxjs/toolkit'
import signupReducer from './feature/userCred/UserCredsSlice'
import messageReducer from './feature/userMessage/UserMessageSlice'
import socketReducer from './feature/socketAsset/socketSlice'

export const store = configureStore({
    reducer: {
        signup: signupReducer,
        messageRed: messageReducer,
        socketSlice: socketReducer,
    },
})


