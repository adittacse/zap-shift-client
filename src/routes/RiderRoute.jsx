import { useContext } from "react";
import AuthContext from "../contexts/AuthContext/AuthContext.jsx";
import useRole from "../hooks/useRole.jsx";
import Loading from "../components/Loading/Loading.jsx";
import Forbidden from "../components/Forbidden/Forbidden.jsx";

const RiderRoute = ({ children }) => {
    const { loading } = useContext(AuthContext);
    const { role, roleLoading } = useRole();

    if (loading || roleLoading) {
        return <Loading />;
    }

    if (role !== "rider" ) {
        return <Forbidden />;
    }

    return children;
};

export default RiderRoute;