import { configureStore } from '@reduxjs/toolkit'
import formReducer from './slices/FormSlices'


export const store = configureStore({
    reducer: {
        form: formReducer,
    },
})