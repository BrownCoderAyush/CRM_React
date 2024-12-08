import { forwardRef, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateTicket } from "../Redux/Slices/TicketSlice";

const TicketDetailsModal = forwardRef(({ticket,isReload},ref)=>{

    const [currTicket , setCurrTicket] =useState(ticket);
    const dispatch = useDispatch();
    function handleTicketChange(e){
        const { name , value } = e.target;
        setCurrTicket({
            ...currTicket,
            [name]:value
        })
    }

    function updateTicketHandler(){
        try{
            dispatch(updateTicket(currTicket))
            isReload((prev)=>!prev)
            console.log("here")
        }catch(e){
            console.log(e);
        }
    }

    useEffect(()=>{
        setCurrTicket(ticket)
    },[ticket])

    return (
        <dialog id="my_modal_1" className="modal" ref={ref}>
            <div className="modal-box">
                <h3 className="font-bold text-lg">{currTicket.title}</h3>
                <textarea 
                    className="bg-white text-black my-2 rounded-lg resize-none p-2 w-full"
                    name="description" 
                    cols="40"
                    rows="10"
                    value={currTicket.description}
                    onChange={handleTicketChange}
                ></textarea>
                <h1>
                    Priority:
                    <select className="m-2 bg-slate-100 text-black rounded-md p-1" value={currTicket.ticketPriority} onChange={handleTicketChange} name="ticketPriority">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                    </select>
                </h1>

                <h1>
                    Status:
                    <select className="m-2 bg-slate-100 text-black rounded-md p-1" value={currTicket.status} onChange={handleTicketChange} name="status">
                        <option value="open">Open</option>
                        <option value="inProgress">In Progress</option>
                        <option value="resolved">Resolved</option>
                        <option value="onHold">On Hold</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                </h1>
                <div className="modal-action">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn">Close</button>
                        <button className="btn btn-success mx-3 hover:bg-green-400 transition-all ease-in-out duration-300" onClick={updateTicketHandler}>Update</button>
                    </form>
                </div>
            </div>
        </dialog>
    )


})

export default TicketDetailsModal;