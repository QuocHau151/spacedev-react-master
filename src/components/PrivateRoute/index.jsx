import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"

export const PrivateRoute = ({ redirect = '/' }) => {
    const { user } = useAuth()

    if (!user) return <Navigate to={redirect}/>

    return <Outlet />
}