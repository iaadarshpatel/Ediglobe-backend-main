import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Action creators
export const fetchEmployeesDetails = createAsyncThunk('fetchEmployeesDetails', async () => {
    const storedEmployeeId = localStorage.getItem('employeeId');
    const response = await axios.get(`http://localhost:3003/api/employees/${storedEmployeeId}`);
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