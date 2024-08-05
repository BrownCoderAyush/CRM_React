import { useRef } from "react";
import { BiMenu } from "react-icons/bi";


function HomeLayout({children}){

    const drawer = useRef(null);
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
                            <button className="inline btn btn-primary px-4 py-2 ">Login</button>
                            <button className="inline btn btn-secondary px-4 py-2">Signup</button>
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