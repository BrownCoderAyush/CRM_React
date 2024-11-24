
import { AiOutlineDownload } from "react-icons/ai";
import { useTickets } from "../hooks/useTickets";
import HomeLayout from "../layouts/HomeLayout";
import { usePDF } from "react-to-pdf";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
// https://react-data-table-component.netlify.app/?path=/story/getting-started-kitchen-sink--kitchen-sink

function Dashboard() {
    const [ticketState] = useTickets()
    const { toPDF , targetRef } = usePDF({filename:'page.pdf'});
    const [searchParams]=useSearchParams();
    const tickets = ticketState 
    ? (searchParams.get("status") ? ticketState.ticketList : ticketState.downloadedTicketList)
    : [];
        return (
        <HomeLayout>
            <div className="min-h-[90vh] flex flex-col items-center justify-center gap-2">
                <div className="bg-yellow-500 w-full text-black text-center text-3xl py-4 font-bold hover:bg-yellow-300 ">
                    Ticket Records  <AiOutlineDownload/>    
                </div>
                <div ref={targetRef}>
                {/* TABLES  */}
                <div className="flex flex-col w-full">
                    {/* row  */}
                    <div className="flex justify-between items-center bg-purple-700 px-1 py-2">
                    <div className="table-row">Ticket Id</div>
                    <div className="table-row">Title</div>
                    <div className="table-row">Description</div>
                    <div className="table-row">Reporter</div>
                    <div className="table-row">Priority</div>
                    <div className="table-row">Assignee</div>
                    <div className="table-row">Status</div>
                    </div>
                </div>
                {tickets.map((ticket=>{
                    return (
                <div className="flex flex-col w-full" key={ticket._id}>
                    <div className="flex flex-col w-full">
                        <div className="flex justify-between items-center bg-purple-700 px-1 py-2">
                        <div className="table-row">{ticket._id}</div>
                        <div className="table-row">{ticket.title}</div>
                        <div className="table-row">{ticket.description}</div>
                        <div className="table-row">{ticket.assignee}</div>
                        <div className="table-row">{ticket.ticketPriority}</div>
                        <div className="table-row">{ticket.assignedTo}</div>
                        <div className="table-row">{ticket.status}</div>
                        </div>
                    </div>
                </div>  
                    )
                }))}
                </div>
            </div>
        </HomeLayout>
        
    )
}

export default Dashboard;