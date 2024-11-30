import { BsFillPencilFill } from "react-icons/bs";

import Card from "../components/Card";
import HomeLayout from "../layouts/HomeLayout";
import { TbProgressBolt } from "react-icons/tb";
import { MdCancel, MdOutlineDoneAll, MdPending } from "react-icons/md";
import { useTickets } from "../hooks/useTickets";
import { Pie,Line, Bar } from 'react-chartjs-2';
import useCharts from "../hooks/useCharts";

export default function Home() {

    const [pieChartData,lineChartData,GroupedBarChartData] = useCharts()
    const [ticketState] = useTickets();
    return (
        <HomeLayout>
            <div className="mt-10 flex gap-1 flex-wrap justify-center">
                <Card
                    titleText="open"
                    quantity={ticketState.ticketDistribution.open}
                    background="bg-yellow-300"
                    borderColor="border-green-300"
                    fontColor="text-black"
                    dividerColor="bg-black"
                    status={ticketState.ticketDistribution.open && (ticketState.ticketDistribution.open / ticketState.downloadedTicketList.length) * 100}
                >
                    <BsFillPencilFill className="inline " />
                </Card>
                <Card
                    titleText="inProgress"
                    quantity={ticketState.ticketDistribution.inProgress}
                    background="bg-orange-300"
                    borderColor="border-green-300"
                    fontColor="text-black"
                    dividerColor="bg-black"
                    status={ticketState.ticketDistribution.inProgress && (ticketState.ticketDistribution.inProgress / ticketState.downloadedTicketList.length) * 100}
                >
                    <TbProgressBolt className="inline " />
                </Card>
                <Card
                    titleText="resolved"
                    quantity={ticketState.ticketDistribution.resolved}
                    borderColor="border-purple-300"
                    fontColor="text-black"
                    dividerColor="bg-black"
                    status={ticketState.ticketDistribution.resolved &&(ticketState.ticketDistribution.resolved / ticketState.downloadedTicketList.length) * 100}
                >
                    <MdOutlineDoneAll className="inline " />
                </Card>
                <Card
                    titleText="onHold"
                    quantity={ticketState.ticketDistribution.onHold}
                    background="bg-gray-300"
                    borderColor="border-gray-800"
                    fontColor="text-black"
                    dividerColor="bg-black"
                    status={ticketState.ticketDistribution.onHold && (ticketState.ticketDistribution.onHold / ticketState.downloadedTicketList.length) * 100}
                >
                    <MdPending className="inline " />
                </Card>
                <Card
                    titleText="cancelled"
                    quantity={ticketState.ticketDistribution.cancelled}
                    background="bg-violet-300"
                    borderColor="border-green-300"
                    fontColor="text-black"
                    dividerColor="bg-black"
                    status={ticketState.ticketDistribution.cancelled &&(ticketState.ticketDistribution.cancelled / ticketState.downloadedTicketList.length) * 100}
                >
                    <MdCancel className="inline " />
                </Card>
            </div>
            <div className="mt-10 flex justify-center items-center gap-10">
                <div>
                    <Pie
                        data={pieChartData}
                    />
                </div>
            </div>
            <div className="mt-10 mb-10 flex justify-center items-center">
            <div className="w-[41rem] h-[20rem] bg-yellow-200">
                <Line data={lineChartData}/>
            </div>
            </div>
            <div className="mt-10 mb-10 flex justify-center items-center">
            <div className="w-[41rem] h-[20rem] bg-yellow-200">
                <Bar data={GroupedBarChartData}/>
            </div>
            </div>
        </HomeLayout>
    );
}