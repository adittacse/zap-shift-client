import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import AuthContext from "../contexts/AuthContext/AuthContext.jsx";
import useAxiosSecure from "./useAxiosSecure.jsx";

const useRole = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const { data: role = "user", isLoading: roleLoading } = useQuery({
        queryKey: ["user-role", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user?.email}/role`);
            return res.data.role;
        }
    });

    return { role, roleLoading };
};

export default useRole;