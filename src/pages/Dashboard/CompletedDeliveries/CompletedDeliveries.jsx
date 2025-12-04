import { useContext } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure.jsx";
import { useQuery } from "@tanstack/react-query";
import AuthContext from "../../../contexts/AuthContext/AuthContext.jsx";

const CompletedDeliveries = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const { data: parcels = [] } = useQuery({
        queryKey: ["parcels", user?.email, "parcel_delivered"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels/rider?riderEmail=${user?.email}&deliveryStatus=parcel_delivered`);
            return res.data;
        }
    });

    const calculatePayout = (parcel) => {
        if (parcel.senderDistricts === parcel.receiverDistrict) {
            return parcel.cost * 0.8;
        } else {
            return parcel.cost * 0.6;
        }
    }

    return (
        <div>
            <h2 className="text-4xl font-extrabold text-secondary mb-[40px]">Completed Deliveries: {parcels.length}</h2>

            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                    <tr>
                        <th>Sl.</th>
                        <th>Parcel Name</th>
                        <th>Created At</th>
                        <th>Pickup District</th>
                        <th>Cost</th>
                        <th>Payout</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            parcels.map((parcel, index) => <tr key={parcel._id}>
                                <th>{index + 1}</th>
                                <td>{parcel?.parcelName}</td>
                                <td>{parcel?.createdAt ? new Date(parcel.createdAt).toISOString().slice(0, 10) : "-"}</td>
                                <td>{parcel?.senderDistrict}</td>
                                <td>{parcel?.cost}</td>
                                <td>{calculatePayout(parcel)}</td>
                                <td>
                                    <button className="btn btn-primary text-black">Cash Out</button>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CompletedDeliveries;