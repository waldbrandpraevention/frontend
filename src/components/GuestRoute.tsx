import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../service/auth";

type GuestRouteType = {
    redirectTo?: string,
    children?: React.ReactNode
}

/* Guests must NOT be logged in otherwise redirect */
const GuestRoute = ({ redirectTo = "/dashboard", children }: GuestRouteType): JSX.Element => {
    const { token } = useAuth();
    const location = useLocation(); /* remember old location */

    if (token !== null) return <Navigate to={redirectTo} replace state={{ from: location }} />

    return children ? children as JSX.Element : <Outlet />;
}

export default GuestRoute;