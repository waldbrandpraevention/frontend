import { Navigate, Outlet } from "react-router-dom";
import { AccountType, useAuth } from "../../service/auth";
import { d } from "../../utils/util";

type RoleRouteType = {
    role?: AccountType,
    redirectTo?: string,
    children?: React.ReactNode
}

/* User must be logged in and role (account type) must match otherwise redirect */
const RoleRoute = ({ role = AccountType.Administrator, redirectTo = "/login", children }: RoleRouteType): JSX.Element => {
    const { user, token } = useAuth();

    if (token === null || user.permission !== role) {
        d("RoleRoute", `Not authorized -> ${redirectTo}`);
        return <Navigate to={redirectTo} replace />
    }

    return children ? children as JSX.Element : <Outlet />;
}

export default RoleRoute;