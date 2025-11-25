import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure.jsx";
import Loading from "../../../components/Loading/Loading.jsx";

const Payment = () => {
    const axiosSecure = useAxiosSecure();
    const { parcelId } = useParams();
    const { isLoading, data: parcel } = useQuery({
        queryKey: ["parcels", parcelId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels/${parcelId}`);
            return res.data;
        }
    });

    const handlePayment = async () => {
        const paymentInfo = {
            parcelId: parcel._id,
            parcelName: parcel.parcelName,
            senderEmail: parcel.senderEmail,
            cost: parcel.cost,
        }

        const res = await axiosSecure.post("/create-checkout-session", paymentInfo);

        window.location.href = res.data.url;
    }

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div>
            <h2 className="text-center">Please Pay ${parcel?.cost} for {parcel?.parcelName}</h2>
            <button onClick={handlePayment} className="btn btn-primary text-black">Pay</button>
        </div>
    );
};

export default Payment;