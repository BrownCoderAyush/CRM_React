import { useEffect, useState } from "react";
import { useTickets } from "./useTickets";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title, CategoryScale, LinearScale, PointElement, LineElement, BarElement } from "chart.js";


ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    Title,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement
);

function useCharts(){
    const [ticketState] = useTickets();
    const [openTicketsData, setOpenTicketsData] = useState({});
    const [closeTicketsData, setCloseTicketsData] = useState({});
    const [ticketCountOfPastOneYear,setTicketCountOfPastOneYear] = useState({})
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

    function processOpenTicketsDateMap(){
        const currDate = new Date();
        let tenthDayFromToday = new Date();
        tenthDayFromToday.setDate(currDate.getDate()-10);
        if(ticketState.downloadedTicketList.length){
            let openTicketsData = {}
            let closedTicketData = {}
            while(tenthDayFromToday<=currDate){
                const date = tenthDayFromToday;
                openTicketsData[date.toLocaleDateString().split("/").reverse().join("-")] = 0;
                closedTicketData[date.toLocaleDateString().split("/").reverse().join("-")] = 0;
                tenthDayFromToday.setDate(tenthDayFromToday.getDate()+1)
            }
            tenthDayFromToday.setDate(tenthDayFromToday.getDate()-11);
            ticketState.downloadedTicketList.forEach((ticket)=>{
                const ticketDate = new Date(ticket.createdAt);
                const date = ticketDate.toLocaleDateString().split("/").reverse().join("-")
                if(ticket.status == 'open' && ticketDate>=tenthDayFromToday){
                    openTicketsData[date]= openTicketsData[date]+1
                }
                if(ticket.status == 'cancelled' && ticketDate>=tenthDayFromToday){           
                    closedTicketData[date]=closedTicketData[date]+1
                }
            })
            setCloseTicketsData(closedTicketData)
            setOpenTicketsData(openTicketsData)
        }
    }

    function processLastOneYearTicketData(){
        let lastYearData = {};
        const currDate = new Date();
        let remainMonth = 12;
        while(remainMonth>0){
            let currMonthYear = `${currDate.getMonth()+1}-${currDate.getFullYear()}`;
            currDate.setMonth(currDate.getMonth()-1);
            lastYearData[currMonthYear]={}
            Object.keys(ticketState.ticketDistribution).forEach((status)=>{
                lastYearData[currMonthYear][status]=0;
            })
            remainMonth--;
        } 
        ticketState.downloadedTicketList.forEach((ticket)=>{
            const createdAt = new Date(ticket.createdAt);
            let monthYear =  `${createdAt.getMonth()+1}-${createdAt.getFullYear()}`;
            if(Object.keys(lastYearData).includes(monthYear)){
                lastYearData[monthYear][ticket.status]+=1
            }
        })
        setTicketCountOfPastOneYear(lastYearData)
    }

    

    useEffect(()=>{
        processOpenTicketsDateMap()
        processLastOneYearTicketData()
    },[ticketState.downloadedTicketList])
  
    const lineChartData = {
        labels : Object.keys(openTicketsData),
        datasets: [
          {
            label: 'Open Tickets Data',
            data: Object.values(openTicketsData),
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
          {
            label: 'Closed Tickets Data',
            data: Object.values(closeTicketsData),
            borderColor: 'rgb(202, 233, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          }       
        ]
    };

    const GroupedBarChartData = {
        labels : Object.keys(ticketCountOfPastOneYear),
        datasets: [
          {
            label: 'open tickets',
            data: Object.keys(ticketCountOfPastOneYear).map((period)=>{
                return ticketCountOfPastOneYear[period]['open']
            }),
            backgroundColor: 'rgb(255, 99, 132)',
            stack: 'Stack 0',
          },
          {
            label: 'closed tickets',
            data: Object.keys(ticketCountOfPastOneYear).map((period)=>{
                return ticketCountOfPastOneYear[period]['cancelled']
            }),
            backgroundColor: 'rgb(75, 192, 192)',
            stack: 'Stack 0',
          }
        ]
      };

      

    return [pieChartData,lineChartData,GroupedBarChartData]
}

export default useCharts;