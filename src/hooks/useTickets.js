import { useDispatch, useSelector } from "react-redux";
import { getAllTicketsForTheUser,filterTickets } from "../Redux/Slices/TicketSlice";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";


export function useTickets() {

    const ticketState = useSelector((state) => state.ticket)
    const authState = useSelector((state) => state.auth);
    const [searchParams]=useSearchParams();
    const dispatch = useDispatch();
    async function loadTickets() {
        dispatch(getAllTicketsForTheUser())
        if(searchParams.get('status')){
             dispatch(filterTickets(searchParams.get("status")))
        }
    }

    useEffect(() => {
        if (authState.isLoggedIn) {
            loadTickets()
        }
        console.log("here")
    }, [authState.token,searchParams.get('status')])


    return [ticketState]
}
