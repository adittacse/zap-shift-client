import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import AuthContext from "../../../contexts/AuthContext/AuthContext.jsx";
import useAxiosSecure from "../../../hooks/useAxiosSecure.jsx";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaMagnifyingGlass } from "react-icons/fa6";
import Swal from "sweetalert2";
import {Link} from "react-router";
// import { Link } from "react-router";

const MyParcels = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const { data: parcels = [], refetch } = useQuery({
        queryKey: ["myParcels", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels?email=${user?.email}`);
            return res.data;
        }
    });

    const handleParcelDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/parcels/${id}`)
                    .then((res) => {
                        if (res.data.deletedCount) {
                            // refresh the data in the ui
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your parcel request has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }

    const handlePayment = async (parcel) => {
        const paymentInfo = {
            parcelId: parcel._id,
            parcelName: parcel.parcelName,
            senderEmail: parcel.senderEmail,
            cost: parcel.cost,
        }

        const res = await axiosSecure.post("/create-checkout-session", paymentInfo);

        window.location.assign(res.data.url);
    }

    return (
        <div>
            <h2>All of my parcels: {parcels.length}</h2>

            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Sl.</th>
                            <th>Name & Weight</th>
                            <th>Cost</th>
                            <th>Receiver Name & Email</th>
                            <th>Receiver Address</th>
                            <th>Payment</th>
                            <th>Tracking Id</th>
                            <th>Delivery Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            parcels.map((parcel, index) => <tr key={parcel._id}>
                                <th>{index + 1}</th>
                                <td>
                                    <p>{parcel?.parcelName}</p>
                                    <p>{parcel?.parcelWeight} kg</p>
                                </td>
                                <td>{parcel?.cost}</td>
                                <td>
                                    <p>{parcel?.receiverName}</p>
                                    <p>{parcel?.receiverEmail}</p>
                                </td>
                                <td>{parcel?.receiverAddress}</td>
                                <td>
                                    {
                                        parcel?.paymentStatus === "paid" ?
                                            <span className="text-green-500">Paid</span>
                                            : // <Link to={`/dashboard/payment/${parcel._id}`}>
                                                <button onClick={() => handlePayment(parcel)} className="btn btn-sm btn-primary text-black">Pay</button>
                                            // </Link>
                                    }
                                </td>
                                <td>
                                    <Link to={`/track-parcel/${parcel.trackingId}`}>
                                        {parcel?.trackingId}
                                    </Link>
                                </td>
                                <td>{parcel?.deliveryStatus}</td>
                                <td className="space-x-2">
                                    <button className="btn btn-square hover:bg-primary tooltip" data-tip="View">
                                        <FaMagnifyingGlass />
                                    </button>
                                    <button className="btn btn-square hover:bg-primary tooltip" data-tip="Edit">
                                        <FaRegEdit />
                                    </button>
                                    <button onClick={() => handleParcelDelete(parcel._id)} className="btn btn-square hover:bg-primary tooltip" data-tip="Delete">
                                        <MdDelete />
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

export default MyParcels;