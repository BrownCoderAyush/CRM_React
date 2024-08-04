import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { login } from "../../Redux/Slices/AuthSlice";



export default function Login(){

    const navigator = useNavigate();
    const dispatch = useDispatch();
    const [loginDetails, setLoginDetails] = useState({
        email : "",
        password : ""
    });

    function handleInputChange(e){
        const {name,value}=e.target;
        setLoginDetails({
            ...loginDetails,
            [name]:value
        });
    }

    function resetLoginState(){
        setLoginDetails({
            email:"",
            password:""
        });
    }

    async function onSubmit(){

        if(loginDetails.email=="" || loginDetails.password=="")return;
        const response = await dispatch(login(loginDetails));
        if(response.payload) navigator("/");
        else resetLoginState();

    }

    
    return (
        <div className="flex justify-center h-[100vh] items-center">
            <div className="card bg-primary text-primary-content w-96">
                <div className="card-body flex flex-col items-center">
                    <h2 className="card-title text-2xl">Login</h2>
                    <input 
                        name="email"
                        type="text" 
                        onChange={handleInputChange} 
                        placeholder="email id" 
                        value={loginDetails.email}
                        className="input input-bordered w-full max-w-xs text-white" 
                    />
                    <input 
                        name="password"
                        type="password"
                        onChange={handleInputChange} 
                        placeholder="Password" 
                        value={loginDetails.password}
                        className="input input-bordered w-full max-w-xs text-white" 
                    />
                    <div className="card-actions flex justify-center basis-2/3">
                        <button className="btn btn-warning w-full basis-70 hover:bg-yellow-300" onClick={onSubmit}>SUBMIT</button>
                    </div>
                    <p className="text-white text-base font-semibold">
                        Don't have an account ? <Link 
                        to="/signup"
                        className="text-red-600"
                        >SignUp Instead</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}