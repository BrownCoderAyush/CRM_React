import { BsFillPencilFill } from "react-icons/bs";

import Card from "../components/Card";
import HomeLayout from "../layouts/HomeLayout";
import { TbProgressBolt } from "react-icons/tb";
import { MdCancel, MdOutlineDoneAll, MdPending } from "react-icons/md";
import { useTickets } from "../hooks/useTickets";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import { Pie } from 'react-chartjs-2';




ChartJS.register(ArcElement, Tooltip, Legend, Title);

export default function Home() {

    const [ticketState] = useTickets()
    const pieChartData = {
        labels: Object.keys(ticketState.ticketDistribution),
        datasets: [
            {
                label: "Issue type",
                data: [
                    (ticketState.ticketDistribution.open / ticketState.downloadedTicketList.length) * 100,
                    (ticketState.ticketDistribution.inProgress / ticketState.downloadedTicketList.length) * 100,
                    (ticketState.ticketDistribution.resolved / ticketState.downloadedTicketList.length) * 100,
                    (ticketState.ticketDistribution.onHold / ticketState.downloadedTicketList.length) * 100,
                    (ticketState.ticketDistribution.cancelled / ticketState.downloadedTicketList.length) * 100
                ],
                backgroundColor: ["yellow", "red", "blue", "purple", "white"],
                fontColor: "white",
                borderColor: "black"
            }
        ]
    }

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
                    titleText="Resolved"
                    quantity={ticketState.ticketDistribution.resolved}
                    borderColor="border-purple-300"
                    fontColor="text-black"
                    dividerColor="bg-black"
                    status={ticketState.ticketDistribution.resolved &&(ticketState.ticketDistribution.resolved / ticketState.downloadedTicketList.length) * 100}
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
                    status={ticketState.ticketDistribution.onHold && (ticketState.ticketDistribution.onHold / ticketState.downloadedTicketList.length) * 100}
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
                    status={ticketState.ticketDistribution.cancelled &&(ticketState.ticketDistribution.cancelled / ticketState.downloadedTicketList.length) * 100}
                >
                    <MdCancel className="inline " />
                </Card>
            </div>
            <div className="mt-10 flex justify-center items-center gap-10">
                <div>
                    <Pie
                        data={pieChartData}
                        backgroundColor
                    />
                </div>
            </div>
        </HomeLayout>
    );
}