import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout.jsx";
import Home from "../pages/Home/Home/Home.jsx";
import Coverage from "../pages/Coverage/Coverage.jsx";

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
        ]
    },
]);

export default Router;