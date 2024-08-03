export default function Signup() {
    return (
        <div className="flex justify-center h-[100vh] items-center">
            <div className="card bg-primary text-primary-content w-96">
                <div className="card-body flex flex-col items-center">
                    <h2 className="card-title text-2xl">Signup</h2>
                    <input type="text" placeholder="User id" className="input input-bordered w-full max-w-xs text-white" />
                    <input type="email" placeholder="email id" className="input input-bordered w-full max-w-xs text-white" />
                    <input type="password" placeholder="Password" className="input input-bordered w-full max-w-xs text-white" />
                    <div className="w-full mb-4">
                    <details className="dropdown">
                        <summary className="btn m-1">USER TYPE</summary>
                        <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow text-white">
                            <li><a>Customer</a></li>
                            <li><a>Engineer</a></li>
                        </ul>
                    </details>
                    </div>
                    <div className="card-actions flex justify-center basis-2/3">
                        <button className="btn btn-warning w-full basis-70 hover:bg-red-500">SUBMIT</button>
                    </div>
                </div>
            </div>
        </div>
    );
}