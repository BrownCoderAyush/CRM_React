import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

import axiosInstance from '../../config/axiosInstance.js';



const initialState = {
    role : localStorage.getItem("role") || undefined,
    data :  JSON.parse(localStorage.getItem("data")) || undefined,
    token : localStorage.getItem("token") || undefined,
    isLoggedIn : localStorage.getItem("isLoggedIn") || false 
};

export const login = createAsyncThunk("/auth/login",async(data)=>{
    try {
        const response = axiosInstance.post("auth/signin",data);
        toast.promise(response,{
            loading: "Submitting form",
            success: "Successfully loggedIn",
            error : "Something went wrong, try again."
        });
        return await response;
    } catch (error) {
        console.log(error,"err");
    }
});

export const signup = createAsyncThunk("/auth/signup",async(data)=>{
    try {
        const response = axiosInstance.post("auth/signup",data);
        toast.promise(response,{
            loading: "Submitting form",
            success: "Successfully signed up",
            error : "Something went wrong, try again."
        });
        return await response;
    } catch (error) {
        console.log(error,"err");
    }
});

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers : {
        logoutAuth : (state)=>{
            localStorage.clear();
            state.role = "";
            state.isLoggedIn = false;
            state.data = undefined;
            state.token = "";
        }
    },
    extraReducers : (builder)=>{

        builder.addCase(login.fulfilled,(state,action)=>{
            
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
export const {logoutAuth} = authSlice.actions;
export default authSlice.reducer;