import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../config/axiosInstance";
import toast from "react-hot-toast";

const initialState = {
    ticketList : [],
    ticketDistribution : {
        open:0,
        inProgress:0,
        resolved:0,
        onHold:0,
        cancelled:0
    }
}

export const getAllTicketsForTheUser = createAsyncThunk('ticket/getAllTicketsForTheUser',async()=>{
    try {
        const response = axiosInstance.get("getMyAssignedTickets",{
            headers:{
                'x-access-token' : localStorage.getItem("token")
            }
        })
        toast.promise(response,{
            success: "Successfully loaded all the tickets",
            loading: "Fetching tickets belonging to you",
            error: "Something went wrong"
        })
        return await response;
    } catch (error) {
        
    }
})

const ticketSlice = createSlice({
    name : "tickets",
    initialState,
    reducers : {
        logoutTicket : (state)=>{
            state.ticketList = []
        }
    },
    extraReducers : (builder)=>{
        builder.addCase(getAllTicketsForTheUser.fulfilled,(state,action)=>{
            if(!action?.payload?.data)return;
            state.ticketList = action?.payload?.data?.result;
            state.ticketDistribution = {
                open:0,
                inProgress:0,
                resolved:0,
                onHold:0,
                cancelled:0
            }
            state.ticketList.forEach((ticket)=>{
                state.ticketDistribution[ticket.status]=state.ticketDistribution[ticket.status]+1
            })
        })
    }
})
export const {logoutTicket} = ticketSlice.actions;
export default ticketSlice.reducer;