import { useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure.jsx";

const AssignRiders = () => {
    const axiosSecure = useAxiosSecure();
    const riderModalRef = useRef(null);
    const { data: parcels = [] } = useQuery({
        queryKey: ["parcels", "pending-pickup"],
        queryFn: async () => {
            const res = await axiosSecure.get("/parcels?deliveryStatus=pending-pickup");
            return res.data;
        }
    });

    const handleAssignRider = (parcel) => {
        riderModalRef.current.showModal();
    }

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
                                    <button onClick={() => handleAssignRider(parcel)} className="btn btn-primary text-black">Assign Rider</button>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>

            <dialog ref={riderModalRef} className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Hello!</h3>
                    <p className="py-4">Press ESC key or click the button below to close</p>
                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>

        </div>
    );
};

export default AssignRiders;