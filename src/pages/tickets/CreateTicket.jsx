import { useState } from "react";
import HomeLayout from "../../layouts/HomeLayout";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { createTicket } from "../../Redux/Slices/TicketSlice";
import { useTickets } from "../../hooks/useTickets";

function CreateTicket(params) {
    const auth = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    useTickets()
    const [ticket, setTicket] = useState({
        title: "",
        description: "",
        ticketPriority: 3,
        status: "open",
        clientName: auth.data.clientName
    })

    async function onFormSubmit(e) {
        e.preventDefault();
        if (!ticket.title || !ticket.description) {
            toast("Title and description is mandatory!!")
        }
        const response = await dispatch(createTicket(ticket)).unwrap()
        if (response?.payload?.status == 201) {
            //ticket creation done 
            setTicket({
                title: "",
                description: "",
                ticketPriority: 3,
                status: "open",
                clientName: auth.data.clientName
            })

        }
    }
    function handleFormChange(e) {
        const { name, value } = e.target;
        setTicket({
            ...ticket,
            [name]: value
        })
    }
    return (
        <HomeLayout>
            <div className="min-h-[90vh] flex items-center justify-center">
                <form
                    onSubmit={onFormSubmit}
                    className="min-w-[40rem] border p-20 border-sky-500 rounded-lg"
                >
                    <h1 className="text-3xl font-semibold text-white text-center">
                        Create new ticket
                    </h1>
                    <label className="form-control w-full my-3">
                        <div className="label">
                            <span className="label-text">What is title of issue ?</span>
                        </div>
                        <input type="text" name="title" value={ticket.title} placeholder="Type here" onChange={handleFormChange} className="input input-bordered input-primary bg-white text-black" />
                    </label>
                    <label className="form-control w-full my-3">
                        <div className="label">
                            <span className="label-text">Describe issue ?</span>
                        </div>
                        <textarea rows="4" name="description" value={ticket.description} placeholder="Type here" onChange={handleFormChange} className="p-2 input-bordered bg-white resize-none  text-black" />
                    </label>
                    <button type="Submit" className="w-full btn mt-2 btn-success w-auto m-auto">Submit</button>

                </form>
            </div>
        </HomeLayout>
    )
}

export default CreateTicket;