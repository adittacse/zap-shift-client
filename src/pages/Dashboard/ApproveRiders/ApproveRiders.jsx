import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure.jsx";
import { FaUserCheck } from "react-icons/fa";
import {IoPersonRemove} from "react-icons/io5";
import {FaTrash} from "react-icons/fa6";
import Swal from "sweetalert2";

const ApproveRiders = () => {
    const axiosSecure = useAxiosSecure();
    const { data: pendingRiders = [], refetch } = useQuery({
        queryKey: ["riders", "pending"],
        queryFn: async () => {
            const res = await axiosSecure.get("/riders");
            return res.data;
        }
    });

    const updateRiderStatus = (rider, status) => {
        const updateInfo = {
            email: rider.riderEmail,
            status: status
        };
        axiosSecure.patch(`/riders/${rider._id}`, updateInfo)
            .then((res) => {
                if (res.data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `Rider status is set to ${status}.`,
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
            });
    }

    const handleApproval = (rider) => {
        updateRiderStatus(rider, "approved");
    }

    const handleRejection = (rider) => {
        updateRiderStatus(rider, "rejected");
    }

    return (
        <div>
            <h2 className="text-4xl">Riders Pending Approval: {pendingRiders.length}</h2>

            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                    <tr>
                        <th>Sl.</th>
                        <th>Name & Email</th>
                        <th>Age</th>
                        <th>Contact</th>
                        <th>NID</th>
                        <th>Region</th>
                        <th>Wire-house</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            pendingRiders.map((rider, index) => <tr key={rider._id}>
                                <th>{index + 1}</th>
                                <td>
                                    <p>{rider?.riderName}</p>
                                    <p>{rider?.riderEmail}</p>
                                </td>
                                <td>{rider?.riderAge}</td>
                                <td>{rider?.riderContact}</td>
                                <td>{rider?.riderNID}</td>
                                <td>{rider?.riderRegion}</td>
                                <td>{rider?.riderDistrict}</td>
                                <td>
                                    <p className={`${rider?.status === "approved" ? "text-green-800" : "text-red-500"}`}>
                                        {rider?.status}
                                    </p>
                                </td>
                                <td>
                                    <button onClick={() => handleApproval(rider)} className="btn mr-2">
                                        <FaUserCheck />
                                    </button>
                                    <button onClick={() => handleRejection(rider)} className="btn mr-2">
                                        <IoPersonRemove />
                                    </button>
                                    <button className="btn">
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ApproveRiders;