import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import axiosInstance from '../../config/axiosInstance.js';



const initialState = {
    role : localStorage.getItem("role") || undefined,
    data :  JSON.parse(localStorage.getItem("data")) || undefined,
    token : localStorage.getItem("token") || undefined,
    isLoggedIn : localStorage.getItem("isLoggedIn") || false 
};

export const login = createAsyncThunk("/auth/login",async(data)=>{
    try {
        const response = await axiosInstance.post("auth/signin",data);
        return response;
    } catch (error) {
        console.log(error,"err");
    }
});

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers : {},
    extraReducers : (builder)=>{

        builder.addCase(login.fulfilled,(state,action)=>{
            // console.log(action,"action");
            // in case backend status is not the desired one then return 
            if(!action.payload || action.payload?.status!==201)return;
            state.isLoggedIn=(action.payload?.data?.token!== undefined);
            state.data = action.payload?.data?.userData;
            state.token = action.payload?.data?.token;
            state.role = action.payload?.data?.userData?.userType;
            localStorage.setItem("role",action.payload?.data?.userData?.userType);
            localStorage.setItem("isLoggedIn",(action.payload?.data?.token!== undefined));
            localStorage.setItem("data", action.payload?.data?.userData && JSON.stringify(action.payload?.data?.userData));
            localStorage.setItem("token",action.payload?.data?.token);
            
        });
    }

});
export default authSlice.reducer;