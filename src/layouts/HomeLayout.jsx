import { useEffect, useRef } from "react";
import { BiMenu } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { logoutAuth } from "../Redux/Slices/AuthSlice";
import { logoutTicket } from "../Redux/Slices/TicketSlice"

function HomeLayout({children}){

    const drawer = useRef(null);
    const auth=useSelector(state=>state.auth);
    const dispatch = useDispatch();
    const navigator = useNavigate();
    
    useEffect(()=>{
        console.log(auth.isLoggedIn,"auth");
    });

    async function onLogout(){
        dispatch(logoutAuth());
        dispatch(logoutTicket());
        navigator('/login');

    }

    //don't allow user to get into "/" if not loggedIn
    useEffect(()=>{
        if(!auth.isLoggedIn){
            navigator("/login");
        }    
    },[]);

    return (
        <div className="min-h-[90vh]">
        <div
            className="drawer absolute left-2 top-2 inline-block w-auto"

            onMouseEnter={() => {
                // drawer.current.checked = true;
            }}
        >
            <input
                id="my-drawer"
                type="checkbox"
                className="drawer-toggle"
                ref={drawer}
            />
            <div className="drawer-content">
                <label htmlFor="my-drawer" className="cursor-pointer"><BiMenu size="32px" /></label>
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul
                    className="menu bg-base-200 text-base-content min-h-full w-80 p-4"
                    onMouseLeave={() => {
                        // drawer.current.checked = false;
                    }}
                >
                    <li><a>View all tickets</a></li>
                    <li><a>Dashboard</a></li>
                    <li className="absolute bottom-3 w-full ">
                        <div className="w-full flex gap-8">
                            {!auth.isLoggedIn ? (
                                <>
                                <button className="inline btn btn-primary px-4 py-2 "><Link to="/login">LogIn</Link></button>
                                <button className="inline btn btn-secondary px-4 py-2"><Link to="/signup">Signup</Link> </button>
                                </>
                            ) : (
                                <>
                                <button className="inline btn btn-primary px-4 py-2 ">Profile</button>
                                <button className="inline btn btn-secondary px-4 py-2" onClick={onLogout}>Logout</button>
                                </>
                            )}
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div className="w-3/4 m-auto">
        <div>
        {children}
        </div> 
        </div>
    </div>
    );
}

export default HomeLayout;