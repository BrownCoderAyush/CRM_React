import { BsFillPencilFill } from "react-icons/bs";

import Card from "../components/Card";
import HomeLayout from "../layouts/HomeLayout";
import { useDispatch, useSelector } from "react-redux";
import { getAllTicketsForTheUser } from "../Redux/Slices/TicketSlice";
import { useEffect } from "react";
import { TbProgressBolt } from "react-icons/tb";
import { MdCancel, MdOutlineDoneAll, MdPending } from "react-icons/md";






export default function Home() {

    const authState = useSelector((state)=>state.auth);
    const ticketState = useSelector((state=>state.ticket))
    const dispatch = useDispatch();

    async function loadTickets(){

        const response = await dispatch(getAllTicketsForTheUser())
        console.log(response)
        return loadTickets
    }

    useEffect(()=>{
        loadTickets();    
    },[authState.token])


    return (
        <HomeLayout>
            <div className="mt-10 flex gap-1 flex-wrap justify-center">
                
                <Card
                    titleText="Open"
                    quantity={ticketState.ticketDistribution.open}
                    background="bg-yellow-300"
                    borderColor="border-green-300"
                    fontColor="text-black"
                    dividerColor="bg-black"
                    status={(ticketState.ticketDistribution.open/ticketState.ticketList.length)*100}
                >
                    <BsFillPencilFill className="inline " />
                </Card>
                <Card
                    titleText="InProgress"
                    quantity={ticketState.ticketDistribution.inProgress}
                    background="bg-orange-300"
                    borderColor="border-green-300"
                    fontColor="text-black"
                    dividerColor="bg-black"
                    status={(ticketState.ticketDistribution.inProgress/ticketState.ticketList.length)*100}
                >
                    <TbProgressBolt className="inline " />
                </Card>
                <Card
                    titleText="Resolved"
                    quantity={ticketState.ticketDistribution.resolved}
                    borderColor="border-purple-300"
                    fontColor="text-black"
                    dividerColor="bg-black"
                    status={(ticketState.ticketDistribution.resolved/ticketState.ticketList.length)*100}
                >
                    <MdOutlineDoneAll className="inline " />
                </Card>
                <Card
                    titleText="OnHold"
                    quantity={ticketState.ticketDistribution.onHold}
                    background="bg-gray-300"
                    borderColor="border-gray-800"
                    fontColor="text-black"
                    dividerColor="bg-black"
                    status={(ticketState.ticketDistribution.onHold/ticketState.ticketList.length)*100}
                >
                    <MdPending className="inline " />
                </Card>
                <Card
                    titleText="Cancelled"
                    quantity={ticketState.ticketDistribution.cancelled}
                    background="bg-violet-300"
                    borderColor="border-green-300"
                    fontColor="text-black"
                    dividerColor="bg-black"
                    status={(ticketState.ticketDistribution.cancelled/ticketState.ticketList.length)*100}
                >
                    <MdCancel className="inline " />
                </Card>
            </div>

        </HomeLayout>
    );
}