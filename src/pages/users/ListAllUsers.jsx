import { useEffect, useState } from "react";
import axiosInstance from "../../config/axiosInstance";
import DataTable from "react-data-table-component";
import HomeLayout from "../../layouts/HomeLayout";

function ListAllUsers() {

    const [users, setUsers] = useState()

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
            reorder : true
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

    return (

        <HomeLayout>
            <DataTable
            className="mt-10"
			columns={columns}
			data={users}
		/>
        </HomeLayout>
        
    )

}

export default ListAllUsers;