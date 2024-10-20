import { configureStore } from "@reduxjs/toolkit";

import AuthSlice from "./Slices/AuthSlice";
import TicketSlice from "./Slices/TicketSlice";
const store = configureStore({

    reducer : {
        auth : AuthSlice,
        ticket : TicketSlice
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
          serializableCheck: false,
    }),
    devTools : true 

});
export default store;