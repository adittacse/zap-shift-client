import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure.jsx";
import Loading from "../../../components/Loading/Loading.jsx";

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const [paymentInfo, setPaymentInfo] = useState({});
    const [loading, setLoading] = useState(true);
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
                    setLoading(false);
                })
        }
    }, [sessionId, axiosSecure]);

    if (loading) {
        return <Loading />;
    }

    return (
        <div>
            <h2 className="text-4xl">Payment Successful</h2>
            <p>Your transaction Id: {paymentInfo?.transactionId}</p>
            <p>Your Parcel Tracking Id: {paymentInfo?.trackingId}</p>
        </div>
    );
};

export default PaymentSuccess;