import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { signup } from "../../Redux/Slices/AuthSlice";



export default function Signup() {

    const navigator = useNavigate();
    const dispatch = useDispatch();
    const detailsRef = useRef(null);

    const [signupDetails, setSignupDetails] = useState({
        email: "",
        password: "",
        name: "",
        userType: "",
        userStatus: "",
        clientName: ""
    });

    function handleInputChange(e) {
        const { name, value } = e.target;
        setSignupDetails({
            ...signupDetails,
            [name]: value
        });
    }

    function resetSignUpState() {
        setSignupDetails({
            email: "",
            password: "",
            name: "",
            userType: "",
            userStatus: "",
            clientName: ""
        });
    }

    async function onSubmit() {

        if (
            signupDetails.email == "" ||
            signupDetails.password == "" ||
            signupDetails.name == "" ||
            signupDetails.userType == "" ||
            signupDetails.userStatus == "" ||
            signupDetails.clientName == ""
        ) return;
        const response = await dispatch(signup(signupDetails));

        if (response.payload) {
            navigator("/login");
            // toast.success('Successfully created account.');
        } 
        else {
            resetSignUpState();
            // toast.error("invalid credentials input.");
        }

}

function handleUserType(e) {

    const type = e.target.textContent;
    if (type == "USER TYPE") return;
    setSignupDetails({
        ...signupDetails,
        userType: type,
        userStatus: (type == "customer") ? "approved" : "suspended"
    });
    detailsRef.current.open = false;

}


return (
    <div className="flex justify-center h-[100vh] items-center">
        <div className="card bg-primary text-primary-content w-96">
            <div className="card-body flex flex-col items-center">
                <h2 className="card-title text-2xl">SignUp</h2>
                <input
                    name="email"
                    type="text"
                    onChange={handleInputChange}
                    placeholder="email id"
                    value={signupDetails.email}
                    className="input input-bordered w-full max-w-xs text-white"
                />
                <input
                    name="password"
                    type="password"
                    onChange={handleInputChange}
                    placeholder="Password"
                    value={signupDetails.password}
                    className="input input-bordered w-full max-w-xs text-white"
                />
                <input
                    name="name"
                    type="text"
                    onChange={handleInputChange}
                    placeholder="name"
                    value={signupDetails.name}
                    className="input input-bordered w-full max-w-xs text-white"
                />
                <div className="flex w-full justify-between">
                    <details

                        ref={detailsRef}
                        onClick={handleUserType}
                        className="dropdown"
                    >
                        <summary className="btn m-1">{(signupDetails.userType == "") ? "USER TYPE" : signupDetails.userType}</summary>
                        <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow text-white">
                            <li><a>customer</a></li>
                            <li><a>engineer</a></li>
                            <li><a>admin</a></li>
                        </ul>
                    </details>
                    {/* <details className="dropdown">
                        <summary className="btn m-1">USER STA</summary>
                        <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow text-white">
                            <li><a>Customer</a></li>
                            <li><a>Engineer</a></li>
                        </ul>
                    </details> */}
                </div>
                <input
                    name="clientName"
                    type="text"
                    onChange={handleInputChange}
                    placeholder="client name"
                    value={signupDetails.clientName}
                    className="input input-bordered w-full max-w-xs text-white"
                />
                <div className="card-actions flex justify-center basis-2/3">
                    <button className="btn btn-warning w-full basis-70 hover:bg-yellow-300" onClick={onSubmit}>SUBMIT</button>
                </div>
                <p className="text-white text-base font-semibold">
                    Already have an account ? <Link
                        to="/login"
                        className="text-red-600"
                    >Login Instead</Link>
                </p>
            </div>
        </div>
    </div>
);
}