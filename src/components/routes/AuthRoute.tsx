import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../service/auth";
import { d } from "../../utils/util";

type AuthRouteType = {
    redirectTo?: string,
    children?: React.ReactNode
}

/* User must be logged in otherwise redirect */
const AuthRoute = ({ redirectTo = "/login", children }: AuthRouteType): JSX.Element => {
    const { token } = useAuth();
    const location = useLocation(); /* remember old location */

    if (token === null) {
        d("AuthRoute", `Not authenticated -> ${redirectTo}`);
        return <Navigate to={redirectTo} replace state={{ from: location }} />
    }

    return children ? children as JSX.Element : <Outlet />;
}

export default AuthRoute;