import React, { useContext } from 'react';
import { useQuery } from "@tanstack/react-query";
import AuthContext from "../../../contexts/AuthContext/AuthContext.jsx";
import useAxiosSecure from "../../../hooks/useAxiosSecure.jsx";

const MyParcels = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const { data: parcels = [] } = useQuery({
        queryKey: ["myParcels", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels?email=${user?.email}`);
            return res.data;
        }
    });
    return (
        <div>
            <h2>All of my parcels: {parcels.length}</h2>
        </div>
    );
};

export default MyParcels;