import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure.jsx";

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const [paymentInfo, setPaymentInfo] = useState({});
    const sessionId = searchParams.get("session_id");
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        if (sessionId) {
            axiosSecure.patch(`/payment-success?session_id=${sessionId}`)
                .then((res) => {
                    setPaymentInfo({
                        transactionId: res.data.transactionId,
                        trackingId: res.data.trackingId,
                    });
                })
        }
    }, [sessionId, axiosSecure]);

    return (
        <div>
            <h2 className="text-4xl">Payment Successful</h2>
            <p>Your transaction Id: {paymentInfo?.transactionId}</p>
            <p>Your Parcel Tracking Id: {paymentInfo?.trackingId}</p>
        </div>
    );
};

export default PaymentSuccess;