import {configureStore} from '@reduxjs/toolkit';
import todoReducer from './slice/employeeSlice';

export const store = configureStore({
    reducer: {
        employeesDetails: todoReducer,
    },
})