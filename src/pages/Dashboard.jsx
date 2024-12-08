
import { AiOutlineDownload } from "react-icons/ai";
import { useTickets } from "../hooks/useTickets";
import HomeLayout from "../layouts/HomeLayout";
import { usePDF } from "react-to-pdf";
import { useSearchParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import DataTable from "react-data-table-component";
import TicketDetailsModal from "../components/TicketDetailsModal";
// https://react-data-table-component.netlify.app/?path=/story/getting-started-kitchen-sink--kitchen-sink


const columns = [
    {
        name: 'Ticket Id',
        selector: row => row._id,
    },
    {
        name: 'Title',
        selector: row => row.title,
    },
    {
        name: 'Description',
        selector: row => row.description,
    },
    {
        name: 'Reporter',
        selector: row => row.assignee,
    },
    {
        name: 'Priority',
        selector: row => row.ticketPriority,
    },
    {
        name: 'Assignee',
        selector: row => row.assignedTo,
    },
    {
        name: 'Status',
        selector: row => row.status,
    }
];


function Dashboard() {
    const [reload,setReload]=useState(false);
    const [ticketState] = useTickets(reload)
    const { toPDF, targetRef } = usePDF({ filename: 'page.pdf' });
    const [searchParams] = useSearchParams();
    const ticketModalRef = useRef(null);
    const [selectedTicket,setSelectedTicket]=useState({});
   
    const tickets = ticketState 
        ? (searchParams.get("status") ? ticketState.ticketList : ticketState.downloadedTicketList)
        : [];
    return (
        <HomeLayout>
            <div className="min-h-[90vh] flex flex-col items-center justify-center gap-2">
                <div className="bg-yellow-500 w-full text-black text-center text-3xl py-4 font-bold hover:bg-yellow-300 ">
                    Ticket Records  <AiOutlineDownload />
                </div>
                <div ref={targetRef}>
                    {/* TABLES  */}
                    <DataTable
                        onRowClicked={(row)=>{
                            setSelectedTicket(row)
                            ticketModalRef.current.showModal()
                        }}
                        columns={columns}
                        data={tickets}
                    />
                </div>
                <TicketDetailsModal ref={ticketModalRef} isReload = {setReload} ticket = {selectedTicket}/>
            </div>
        </HomeLayout>

    )
}

export default Dashboard;