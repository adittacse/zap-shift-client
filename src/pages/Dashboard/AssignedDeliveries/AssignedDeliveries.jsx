import { useContext, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure.jsx";
import { useQuery } from "@tanstack/react-query";
import AuthContext from "../../../contexts/AuthContext/AuthContext.jsx";
import Swal from "sweetalert2";

const AssignedDeliveries = () => {
    const [isConfirmed, setIsConfirmed] = useState(false);
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const { data: parcels = [], refetch } = useQuery({
        queryKey: ["parcels", user?.email, "driver_assigned"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels/rider?riderEmail=${user?.email}&deliveryStatus=driver_assigned`);
            return res.data;
        }
    });

    const handleAcceptDelivery = (parcel) => {
        const statusInfo = {
            deliveryStatus: "rider_arriving"
        };

        axiosSecure.patch(`/parcels/${parcel._id}/status`, statusInfo)
            .then((res) => {
                if (res.data.modifiedCount) {
                    refetch();
                    setIsConfirmed(true);
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Thank you for accepting.",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }

    return (
        <div>
            <h2 className="text-4xl font-extrabold text-secondary mb-[40px]">Assigned Parcels: {parcels.length}</h2>

            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                    <tr>
                        <th>Sl.</th>
                        <th>Parcel Name</th>
                        <th>Weight</th>
                        <th>Sender Address</th>
                        <th>Pickup Instruction</th>
                        <th>Delivery Instruction</th>
                        <th>Confirm</th>
                        <th>Other Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            parcels.map((parcel, index) => <tr key={parcel._id}>
                                <th>{index + 1}</th>
                                <td>{parcel?.parcelName}</td>
                                <td>{parcel?.parcelWeight} kg</td>
                                <td>{parcel?.senderAddress}</td>
                                <td>{parcel?.pickupInstruction}</td>
                                <td>{parcel?.deliveryInstruction}</td>
                                <td>
                                    {
                                        parcel.deliveryStatus === "driver_assigned" ? <>
                                            <button onClick={() => handleAcceptDelivery(parcel)} className="btn btn-primary text-black mr-2">Accept</button>
                                            <button className="btn btn-warning text-black">Reject</button>
                                        </> :
                                        isConfirmed === true ? <span>Accepted</span> : <span>Rejected</span>
                                    }
                                </td>
                                <td>

                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AssignedDeliveries;