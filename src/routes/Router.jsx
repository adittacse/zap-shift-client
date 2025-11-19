import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout.jsx";
import Home from "../pages/Home/Home/Home.jsx";
import Coverage from "../pages/Coverage/Coverage.jsx";
import NotFound from "../pages/NotFound/NotFound.jsx";
import AuthLayout from "../layouts/AuthLayout.jsx";
import Login from "../pages/Auth/Login/Login.jsx";
import Register from "../pages/Auth/Register/Register.jsx";
import Rider from "../pages/Rider/Rider.jsx";
import PrivateRoute from "./PrivateRoute.jsx";

const Router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayout,
        children : [
            {
                index: true,
                element: <Home />
            },
            {
                path: "coverage",
                loader: () => fetch("/serviceCenters.json"),
                element: <Coverage />
            },
            {
                path: "be-a-rider",
                element: <PrivateRoute><Rider /></PrivateRoute>
            },
            {
                path: "*",
                element: <NotFound />
            }
        ]
    },
    {
        path: "/",
        Component: AuthLayout,
        children: [
            {
                path: "login",
                element: <Login />
            },
            {
                path: "register",
                element: <Register />
            }
        ]
    }
]);

export default Router;