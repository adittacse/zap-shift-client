import { useContext } from "react";
import AuthContext from "../contexts/AuthContext/AuthContext.jsx";
import Loading from "../components/Loading/Loading.jsx";
import useRole from "../hooks/useRole.jsx";
import Forbidden from "../components/Forbidden/Forbidden.jsx";

const AdminRoute = ({ children }) => {
    const { loading } = useContext(AuthContext);
    const { role, roleLoading } = useRole();

    if (loading || roleLoading) {
        return <Loading />;
    }

    if (role !== "admin") {
        return <Forbidden />;
    }

    return children;
};

export default AdminRoute;