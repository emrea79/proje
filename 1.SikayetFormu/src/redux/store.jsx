import { configureStore } from '@reduxjs/toolkit'
import formReducer from './slices/FormSlices'
import userReducer from './slices/UserSlices'


export const store = configureStore({
    reducer: {
        form: formReducer,
        user: userReducer,
    },
})