import { createBrowserRouter } from "react-router-dom";
import App from "./pages/App"
import TileDemo from "./pages/TileDemo";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
    },
    {
        path: "/test",
        element: "Hello World"
    },
    {
        path: "/tiledemo", /* Nur fürs debuggen */
        element: <TileDemo/>
    }
]);

export default router;