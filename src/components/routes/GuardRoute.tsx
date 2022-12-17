import { Navigate, Outlet } from "react-router-dom";

type GuardRouteType = {
    allow: boolean,
    redirectTo?: string,
    children?: React.ReactNode
}

/* Guard must be true otherwise redirect */
const GuardRoute = ({ allow, redirectTo = "/login", children }: GuardRouteType): JSX.Element => {
    if (!allow) return <Navigate to={redirectTo} replace />

    return children ? children as JSX.Element : <Outlet />;
}

export default GuardRoute;