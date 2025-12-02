import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure.jsx";

const AssignRiders = () => {
    const axiosSecure = useAxiosSecure();
    const { data: parcels = [] } = useQuery({
        queryKey: ["parcels", "pending-pickup"],
        queryFn: async () => {
            const res = await axiosSecure.get("/parcels?deliveryStatus=pending-pickup");
            return res.data;
        }
    });

    return (
        <div>
            <h2 className="text-5xl font-extrabold text-secondary mb-[40px]">Assign Riders: {parcels.length}</h2>

            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                    <tr>
                        <th>Sl.</th>
                        <th>Parcel Name</th>
                        <th>Cost</th>
                        <th>Created At</th>
                        <th>Pickup District</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            parcels.map((parcel, index) => <tr key={parcel._id}>
                                <th>{index + 1}</th>
                                <td>{parcel?.parcelName}</td>
                                <td>{parcel?.cost}</td>
                                <td>{parcel?.createdAt ? new Date(parcel.createdAt).toISOString().slice(0, 10) : "-"}</td>
                                <td>{parcel?.senderDistrict}</td>
                                <td>
                                    <button className="btn btn-primary text-black">Assign Rider</button>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AssignRiders;