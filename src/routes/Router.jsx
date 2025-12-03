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
import SendParcel from "../pages/SendParcel/SendParcel.jsx";
import DashboardLayout from "../layouts/DashboardLayout.jsx";
import MyParcels from "../pages/Dashboard/MyParcels/MyParcels.jsx";
import Payment from "../pages/Dashboard/Payment/Payment.jsx";
import PaymentSuccess from "../pages/Dashboard/Payment/PaymentSuccess.jsx";
import PaymentCancelled from "../pages/Dashboard/Payment/PaymentCancelled.jsx";
import PaymentHistory from "../pages/Dashboard/PaymentHistory/PaymentHistory.jsx";
import ApproveRiders from "../pages/Dashboard/ApproveRiders/ApproveRiders.jsx";
import UsersManagement from "../pages/Dashboard/UsersManagement/UsersManagement.jsx";
import AdminRoute from "./AdminRoute.jsx";
import AssignRiders from "../pages/Dashboard/AssignRiders/AssignRiders.jsx";
import RiderRoute from "./RiderRoute.jsx";
import AssignedDeliveries from "../pages/Dashboard/AssignedDeliveries/AssignedDeliveries.jsx";

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
                loader: () => fetch("/serviceCenters.json"),
                element: <PrivateRoute><Rider /></PrivateRoute>
            },
            {
                path: "send-parcel",
                loader: () => fetch("/serviceCenters.json"),
                element: <PrivateRoute><SendParcel /></PrivateRoute>
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
    },
    {
        path: "dashboard",
        element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
        children: [
            {
                path: "my-parcels",
                element: <MyParcels />
            },
            {
                path: "payment/:parcelId",
                element: <Payment />
            },
            {
                path: "payment-success",
                element: <PaymentSuccess />
            },
            {
                path: "payment-cancelled",
                element: <PaymentCancelled />
            },
            {
                path: "payment-history",
                element: <PaymentHistory />
            },
            {
                path: "approve-riders",
                element: <AdminRoute><ApproveRiders /></AdminRoute>
            },
            {
                path: "assign-riders",
                element: <AdminRoute><AssignRiders /></AdminRoute>
            },
            {
                path: "users-management",
                element: <AdminRoute><UsersManagement /></AdminRoute>
            },
            {
                path: "assigned-deliveries",
                element: <RiderRoute><AssignedDeliveries /></RiderRoute>
            }
        ]
    }
]);

export default Router;