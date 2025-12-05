import useRole from "../../../hooks/useRole.jsx";
import Loading from "../../../components/Loading/Loading.jsx";
import AdminDashboardHome from "./AdminDashboardHome.jsx";
import RiderDashboardHome from "./RiderDashboardHome.jsx";
import UserDashboardHome from "./UserDashboardHome.jsx";

const DashboardHome = () => {
    const { role, roleLoading } = useRole();

    if (roleLoading) {
        return <Loading />;
    }

    if (role === "admin") {
        return <AdminDashboardHome />;
    } else if (role === "rider") {
        return <RiderDashboardHome />;
    } else {
        return <UserDashboardHome />;
    }
};

export default DashboardHome;