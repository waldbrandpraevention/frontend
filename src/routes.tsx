import { createBrowserRouter } from "react-router-dom";
import App from "./pages/App"
import Datenschutz from "./pages/Datenschutz";
import Impressum from "./pages/Impressum";

const router = createBrowserRouter([
    {
        path: "/", /* TODO: Falls angemeldet redirect zu /dashboard sonst zu /login */
        element: <App />,
    },
    {
        path: "/login",
        element: "Login"
    },
    {
        path: "/register",
        element: "registrieren"
    },
    {
        path: "/forgot-password",
        element: "forgot-password"
    },
    {
        path: "/reset-password",
        element: "reset-password"
    },
    {
        path: "/confirm-email",
        element: "email verif"
    },
    {
        path: "/dashboard",
        element: "dashboard"
    },
    {
        path: "/impressum",
        element: <Impressum />
    },
    {
        path: "/datenschutz",
        element: <Datenschutz />
    },
    {
        path: "/advanced", /* Admin */
        element: "advanced"
    },
    {
        path: "/settings/account",
        element: "account settings "
    },
    {
        path: "/settings/system", /* Admin */
        element: "system settings"
    },
    {
        path: "/settings/users", /* Usermanagement (Admin) */
        element: "usermanagement"
    },
    {
        path: "/map",
        element: "map"
    },
    {
        path: "/zones",
        element: "zoneübersicht"
    },
    {
        path: "/zones/:id", /* Zonen ID */
        element: "zonenseite"
    }
]);

export default router;