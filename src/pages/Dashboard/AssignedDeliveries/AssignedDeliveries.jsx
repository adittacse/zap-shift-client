import { useContext } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure.jsx";
import { useQuery } from "@tanstack/react-query";
import AuthContext from "../../../contexts/AuthContext/AuthContext.jsx";
import Swal from "sweetalert2";

const AssignedDeliveries = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const { data: parcels = [], refetch } = useQuery({
        queryKey: ["parcels", user?.email, "driver_assigned"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels/rider?riderEmail=${user?.email}&deliveryStatus=driver_assigned`);
            return res.data;
        }
    });

    const handleDeliveryStatusUpdate = (parcel, status) => {
        const statusInfo = {
            deliveryStatus: status
        };

        let message = `Parcel status is update with ${status.split("_").join(" ")}.`;

        axiosSecure.patch(`/parcels/${parcel._id}/status`, statusInfo)
            .then((res) => {
                if (res.data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: message,
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
                                            <button onClick={() => handleDeliveryStatusUpdate(parcel, "rider_arriving")} className="btn btn-primary text-black mr-2">Accept</button>
                                            <button className="btn btn-warning text-black">Reject</button>
                                        </> :
                                        <span>Accepted</span>
                                    }
                                </td>
                                <td className="flex flex-col gap-2">
                                    <button onClick={() => handleDeliveryStatusUpdate(parcel, "parcel_picked_up")} className="btn btn-primary text-black">Marked as Picked Up</button>
                                    <button onClick={() => handleDeliveryStatusUpdate(parcel, "parcel_delivered")} className="btn btn-primary text-black">Marked as Delivered</button>
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