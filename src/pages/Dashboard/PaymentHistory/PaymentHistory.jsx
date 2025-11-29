import React, {useContext} from 'react';
import {useQuery} from "@tanstack/react-query";
import AuthContext from "../../../contexts/AuthContext/AuthContext.jsx";
import useAxiosSecure from "../../../hooks/useAxiosSecure.jsx";
import {Link} from "react-router";

const PaymentHistory = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const {data: payments = []} = useQuery({
        queryKey: ["payments", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments?email=${user?.email}`)
            return res.data;
        }
    });

    return (
        <div>
            <h2 className="text-5xl font-extrabold text-secondary mb-[40px]">Payment History: {payments.length}</h2>

            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                    <tr>
                        <th>Sl.</th>
                        <th>Parcel Info</th>
                        <th>Paid Time</th>
                        <th>Transaction Id</th>
                        <th>Tracking Number</th>
                        <th>Payment Info</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            payments.map((payment, index) => <tr key={payment._id}>
                                <th>{index + 1}</th>
                                <td>{payment?.parcelName}</td>
                                <td>{new Date(payment?.paidAt).toISOString().slice(0, 10)}</td>
                                <td>{payment?.transactionId}</td>
                                <td>{payment?.trackingId}</td>
                                <td>$ {payment?.amount} ({payment?.paymentStatus})</td>
                                <td>
                                    <Link to={``}>
                                        <button className="btn btn-primary text-black btn-sm">View</button>
                                    </Link>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentHistory;