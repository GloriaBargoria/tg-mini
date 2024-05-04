import { Outlet, Navigate } from 'react-router-dom'

const PrivateRoutes = () => {
const connected = localStorage.getItem("auth")


    return(
        connected ? <Outlet/> : <Navigate to="/login"/>
    )
}

export default PrivateRoutes