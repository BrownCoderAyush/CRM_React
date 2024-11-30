import { useSelector } from "react-redux"
import { Outlet } from "react-router-dom"

function AuthRoutes({allowedRoles = []}){
    const {role} = useSelector(state=>state.auth)
    return (
        <>
        {allowedRoles.includes(role)?<Outlet/>:<div>Denied</div>}
        </>
    )
}

export default AuthRoutes