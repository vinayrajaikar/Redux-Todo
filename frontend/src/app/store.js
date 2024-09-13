import {configureStore} from '@reduxjs/toolkit'
import todoReducer from '../features/todo/todoSlice.js';
import authReducer from '../features/authSlice.js'

export const store = configureStore({
    // reducer:todoReducer
    reducer:{
        todo: todoReducer,
        auth: authReducer
        
    }
});