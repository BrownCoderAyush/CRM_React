export default function Login() {
    return (
        <div className="flex justify-center h-[100vh] items-center">
            <div className="card bg-primary text-primary-content w-96">
                <div className="card-body flex flex-col items-center">
                    <h2 className="card-title text-2xl">Login</h2>
                    <input type="text" placeholder="User id" className="input input-bordered w-full max-w-xs text-white" />
                    <input type="password" placeholder="Password" className="input input-bordered w-full max-w-xs text-white" />
                    <div className="card-actions flex justify-center basis-2/3">
                        <button class="btn btn-warning w-full basis-70 hover:bg-red-500">SUBMIT</button>
                    </div>
                </div>
            </div>
        </div>
    )
}