import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Action creators
export const fetchEmployeesDetails = createAsyncThunk('fetchEmployeesDetails', async () => {
    const token = localStorage.getItem("Access Token")
    const storedEmployeeId = localStorage.getItem('employeeId');
    const response = await axios.get(`https://ediglobe-backend-main.onrender.com/employee/employees/${storedEmployeeId}`,{headers: {
        Authorization: token
    }});
    return response.data;
    
})

const todoSlice = createSlice({
    name: 'employeesDetails',
    initialState: {
        isLoading: false,
        data: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(fetchEmployeesDetails.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(fetchEmployeesDetails.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        })
        builder.addCase(fetchEmployeesDetails.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            console.log(action.error.message);
        })
    }
})

export default todoSlice.reducer;