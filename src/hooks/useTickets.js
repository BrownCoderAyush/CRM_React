import { useDispatch, useSelector } from "react-redux";
import { getAllTicketsForTheUser, filterTickets } from "../Redux/Slices/TicketSlice";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
// https://stackoverflow.com/questions/75804042/what-is-dispatch-unwrap-in-redux-toolkit unwrap issue resolved

export function useTickets(reload) {

    const ticketState = useSelector((state) => state.ticket)
    const authState = useSelector((state) => state.auth);
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();
    async function loadTickets() {
        try {
            if(authState.role=="customer"){
                await dispatch(getAllTicketsForByTheUser()).unwrap()
            }else{
                await dispatch(getAllTicketsForTheUser()).unwrap()
            }         
            if (searchParams.get('status')) {
                dispatch(filterTickets(searchParams.get("status")))
            }
        } catch (error) {
            toast(error.message)
        }

    }

    useEffect(() => {
        if (authState.isLoggedIn) {
            loadTickets()
        }
    }, [authState.token, searchParams.get('status'), reload])


    return [ticketState]
}
