// import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
// // import axiosInstance from "../../utils/axiosInstance";
// import axios from 'axios';
// const initialState = {
//   userDetails: null,
//   loading: false,
//   status: false,
// };

// export const loginUser = createAsyncThunk("loginUser", async (details) => {
//     const response = await axios.post("http://localhost:8000/api/v2/users/login", details);
//     return response.data.data;
// });

// const authSlice = createSlice({
//     name:"auth",
//     initialState,
//     reducers:{},
//     extraReducers:(builder)=>{
//         builder
//         .addCase(loginUser.pending, (state) => {
//           state.loading = true;
//         })
//         .addCase(loginUser.fulfilled, (state, action) => {
//           state.userDetails = action.payload;
//           state.loading = false;
//           state.status = true;
//         })
//         .addCase(loginUser.rejected, (state) => {
//           state.loading = false;
//           state.userDetails = null;
//           state.status = false;
//         });
//     }
// })

// export default authSlice.reducer;




import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  userDetails: null,
  loading: false,
  status: false,
  errorMessage: '',
};

// Define the loginUser async thunk
export const loginUser = createAsyncThunk('auth/loginUser', async (details, { rejectWithValue }) => {
  try {
    const response = await axios.post('http://localhost:8000/api/v2/users/login', details);
    console.log("Successfully Logged in")
    console.log(response)
    console.log(response.data)
    console.log(response.data.data.user)
    return response.data;
  } catch (error) {
    // Handle and return errors properly
    // return rejectWithValue(error.response?.data?.message || 'Login failed');
    return ("Failed to Login");
  }
});

export const registerUser = createAsyncThunk('auth/Register',async(details)=>{
  try{
    const response = await axios.post('http://localhost:8000/api/v2/users/register',details);
    console.log("Registration Successfull");
    console.log(response)
    return response.data;
  }
  catch(error){
    return("Failed to Register");
  }
})


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.errorMessage = '';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.userDetails = action.payload.data.user;
        state.loading = false;
        state.status = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.userDetails = null;
        state.status = false;
        state.errorMessage = action.payload; // Set error message
      });

    builder
    .addCase(registerUser.pending,(state)=>{
      state.loading = true;
      state.errorMessage = '';
    })

    .addCase(registerUser.fulfilled,(state,action)=>{
      state.userDetails = action.payload.data.user;
      state.loading = false;
      state.status = true;
    })

    .addCase(registerUser.rejected,(state,action)=>{
      state.loading = false;
      state.userDetails = null;
      state.status = false;
      state.errorMessage = action.payload;
    })
    
  },
});

export default authSlice.reducer;
