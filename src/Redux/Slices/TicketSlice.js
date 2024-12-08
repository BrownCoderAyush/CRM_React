import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import axiosInstance from "../../config/axiosInstance";
import toast from "react-hot-toast";


const initialState = {
    ticketList: [],
    downloadedTicketList: [],
    ticketDistribution: {
        open: 0,
        inProgress: 0,
        resolved: 0,
        onHold: 0,
        cancelled: 0
    }
}

export const getAllTicketsForTheUser = createAsyncThunk('ticket/getAllTicketsForTheUser', async () => {
    try {
        const response = axiosInstance.get("getMyAssignedTickets", {
            headers: {
                'x-access-token': localStorage.getItem("token")
            }
        })
        toast.promise(response, {
            success: "Successfully loaded all the tickets",
            loading: "Fetching tickets belonging to you",
            error: "Something went wrong"
        })
        return await response
    } catch (error) {
        throw new Error(error.message)
    }
})

export const getAllTicketsByTheUser = createAsyncThunk('ticket/getAllTicketsByTheUser', async () => {
    try {
        const response = axiosInstance.get("getMyCreatedTickets", {
            headers: {
                'x-access-token': localStorage.getItem("token")
            }
        })
        toast.promise(response, {
            success: "Successfully loaded all the tickets",
            loading: "Fetching tickets belonging to you",
            error: "Something went wrong"
        })
        return await response
    } catch (error) {
        throw new Error(error.message)
    }
})

export const updateTicket = createAsyncThunk('ticket/updateTicket', async (ticket) => {
    try {
        console.log(ticket, "tkt")
        const response = axiosInstance.patch(`ticket/${ticket._id}`,ticket,{
            headers: {
                'x-access-token': localStorage.getItem("token")
            }
        }
        )
        toast.promise(response, {
            success: "Successfully updated ticket",
            loading: "Updating ticket",
            error: "Something went wrong"
        })
        return await response
    } catch (error) {
        throw new Error(error.message)
    }
})

export const createTicket = createAsyncThunk('ticket/createTicket', async (ticket) => {
    try {
        const response =  axiosInstance.post(`ticket`,ticket,{
            headers: {
                'x-access-token': localStorage.getItem("token")
            }
        }
        
        )
        toast.promise(response, {
            success: "Successfully created ticket",
            loading: "creating ticket...",
            error: "Something went wrong"
        })
        console.log(response)
        return await response
    } catch (error) {
        throw new Error(error.message)
    }
})

const ticketSlice = createSlice({
    name: "tickets",
    initialState,
    reducers: {
        logoutTicket: (state) => {
            state.ticketList = []
            state.downloadedTicketList = []
            state.ticketDistribution = initialState.ticketDistribution
        },
        filterTickets: (state, action) => {
            console.log(action.payload)
            state.ticketList = state.downloadedTicketList.filter((ticket) => { return ticket.status == action.payload })
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAllTicketsForTheUser.fulfilled, (state, action) => {
            if (!action?.payload?.data) return;
            state.downloadedTicketList = action?.payload?.data?.result;
            console.log(state.downloadedTicketList,"state")
            state.ticketDistribution = {
                open: 0,
                inProgress: 0,
                resolved: 0,
                onHold: 0,
                cancelled: 0
            }
            state.downloadedTicketList.forEach((ticket) => {
                state.ticketDistribution[ticket.status] = state.ticketDistribution[ticket.status] + 1
            })
        })
        .addCase(updateTicket.fulfilled, (state, action) => {
            if (!action?.payload?.data?.result) return;
            const updatedData = action.payload.data.result;
        
            // Update the downloadedTicketList
            state.downloadedTicketList = state.downloadedTicketList.map((ticket) =>
                ticket._id === updatedData._id ? updatedData : ticket
            );
        
            // Update the ticketList
            state.ticketList = state.ticketList.map((ticket) =>
                ticket._id === updatedData._id ? updatedData : ticket
            );
        
            // Recalculate ticketDistribution
            state.ticketDistribution = {
                open: 0,
                inProgress: 0,
                resolved: 0,
                onHold: 0,
                cancelled: 0,
            };
        
            state.downloadedTicketList.forEach((ticket) => {
                state.ticketDistribution[ticket.status] += 1;
            });
        
            console.log(state.downloadedTicketList, "Updated downloadedTicketList");
            console.log("Updated ticket distribution", state.ticketDistribution);
        })
        .addCase(createTicket.fulfilled,(state,action)=>{
            const newTicket = action.payload.data;
            state.downloadedTicketList.push(newTicket);
            state.ticketDistribution = {
                open: 0,
                inProgress: 0,
                resolved: 0,
                onHold: 0,
                cancelled: 0,
            };
        
            state.downloadedTicketList.forEach((ticket) => {
                state.ticketDistribution[ticket.status] += 1;
            });
        
        })
        .addCase(getAllTicketsByTheUser.fulfilled, (state, action) => {
            if (!action?.payload?.data) return;
            state.downloadedTicketList = action?.payload?.data?.result;
            console.log(state.downloadedTicketList,"state")
            state.ticketDistribution = {
                open: 0,
                inProgress: 0,
                resolved: 0,
                onHold: 0,
                cancelled: 0
            }
            state.downloadedTicketList.forEach((ticket) => {
                state.ticketDistribution[ticket.status] = state.ticketDistribution[ticket.status] + 1
            })
        });
    }
})
export const { logoutTicket, filterTickets } = ticketSlice.actions;
export default ticketSlice.reducer;