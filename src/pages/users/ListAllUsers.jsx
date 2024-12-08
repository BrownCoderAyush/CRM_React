import { useEffect, useRef, useState } from "react";
import axiosInstance from "../../config/axiosInstance";
import DataTable from "react-data-table-component";
import HomeLayout from "../../layouts/HomeLayout";
import toast from "react-hot-toast";

function ListAllUsers() {

    const [users, setUsers] = useState([]);
    const [displayUser, setDisplayUser] = useState({});
    const modalTableRef = useRef(null)
    async function fetchAllUsers() {
        const response = await axiosInstance.get("/users", {
            headers: {
                'x-access-token': localStorage.getItem("token")
            }
        })
        setUsers(response?.data?.result)
    }
    useEffect(() => {
        fetchAllUsers()
    }, [])

    const columns = [
        {
            name: 'User id',
            selector: row => row._id,
        },
        {
            name: 'Email',
            selector: row => row.email,
        },
        {
            name: "Name",
            selector: row => row.name,
            reorder: true
        },
        {
            name: "Status",
            selector: row => row.userStatus,
            reorder: true
        },
        {
            name: "Type",
            selector: row => row.userType,
            reorder: true
        }
    ];

    async function handleUserStatusChange(e){
        if(e.target.textContent == displayUser.userStatus){
            return;
        }
        const response = await axiosInstance.patch("user/updateUser",{
            userId : displayUser.id,
            updates : {
                ...displayUser,
                userStatus : e.target.textContent
            }
        },{
            headers: {
                'x-access-token': localStorage.getItem('token') 
            }
        })
        setDisplayUser(() => {
            return {
            ...displayUser,
            userStatus : e.target.textContent
            }
        })
        if(response?.data?.result){
            toast.success("Successfully updated the user")
            fetchAllUsers()
        }
        
        const dropDown = document.getElementById("user-status-dropdown")
        dropDown.open=!dropDown.open
    }

    return (

        <HomeLayout>
            <div className="flex flex-col">
                <h1 className="text-center font-bold text-5xl mt-5 text-yellow-400"> Users List </h1>
                <DataTable
                    className="mt-10"
                    columns={columns}
                    data={users}
                    onRowClicked={(row) => {
                        console.log(row)
                        setDisplayUser({
                            email: row.email,
                            name: row.name,
                            userType: row.userType,
                            userStatus: row.userStatus,
                            clientName: row.clientName,
                            id : row._id
                        })
                        modalTableRef.current.showModal()
                    }}
                />
                <dialog id="my_modal_1" className="modal" ref={modalTableRef}>
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">User Information</h3>
                        <p className="py-4">Name :  <span className="text-yellow-400 font-bold">{displayUser.name}</span></p>
                        <p className="py-4">Email : <span className="text-yellow-400 font-bold">{displayUser.email}</span></p>
                        <p className="py-4">Type : <span className="text-yellow-400 font-bold">{displayUser.userType}</span></p>
                        <p className="py-4">Status :
                            <span className="text-yellow-400 font-bold">
                                <details className="dropdown ml-2" id="user-status-dropdown">
                                    <summary className="btn m-1">{displayUser.userStatus}</summary>
                                    <ul onClick={(e) =>  handleUserStatusChange(e)} className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                                        <li><a >approved</a></li>
                                        <li><a>suspended</a></li>
                                        <li><a>rejected</a></li>
                                    </ul>
                                </details>
                            </span>
                        </p>
                        <p className="py-4">Client : <span className="text-yellow-400 font-bold">{displayUser.clientName}</span></p>
                        <div className="modal-action">
                            <form method="dialog">
                                <button className="btn">Close</button>
                            </form>
                        </div>
                    </div>
                </dialog>
            </div>
        </HomeLayout>

    )

}

export default ListAllUsers;