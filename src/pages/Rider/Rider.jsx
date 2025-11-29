import { useContext } from "react";
import { useLoaderData } from "react-router";
import { useForm, useWatch } from "react-hook-form";
import AuthContext from "../../contexts/AuthContext/AuthContext.jsx";
import rider from "../../assets/agent-pending.png";
import useAxiosSecure from "../../hooks/useAxiosSecure.jsx";
import Swal from "sweetalert2";

const Rider = () => {
    const {
        register,
        handleSubmit,
        control
    } = useForm();
    const serviceCenters = useLoaderData();
    const regionsDuplicate = serviceCenters.map(c => c.region);
    const regions = [...new Set(regionsDuplicate)];
    const riderRegion = useWatch({ control, name: "riderRegion" });

    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    const districtsByRegions = (region) => {
        const regionsDistricts = serviceCenters.filter(c => c.region === region);
        const districts = regionsDistricts.map(d => d.district);
        return districts;
    }

    const handleRiderApplication = (data) => {
        axiosSecure.post("/riders", data)
            .then(res => {
                if (res.data.insertedId) {
                    Swal.fire({
                        title: "Your application has been submitted. Please wait for confirmation.",
                        icon: "success",
                        draggable: true
                    });
                } else if (res.data.message === "already a rider") {
                    Swal.fire({
                        title: "You are already a rider.",
                        icon: "success",
                        draggable: true
                    });
                }
            })
    }

    return (
        <div className="bg-base-100 rounded-4xl py-20 px-[109px] mb-24">
            <h2 className="font-extrabold text-5xl text-secondary mb-4">Be A Rider</h2>
            <p className="text-black-9">Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal <br />packages to business shipments — we deliver on time, every time.</p>

            <div className="divider my-[50px]"></div>

            <div className="flex flex-col lg:flex-row items-center justify-center lg:gap-[190px]">
                <div>
                    <form onSubmit={handleSubmit(handleRiderApplication)}>
                        <fieldset className="fieldset">
                            <h2 className="text-[28px] text-secondary font-extrabold mb-[30px]">Tell us about yourself</h2>

                            <div className="flex flex-col md:flex-row items-center gap-5">
                                {/* rider name */}
                                <fieldset className="fieldset">
                                    <label className="label">Your Name</label>
                                    <input {...register("riderName")} defaultValue={user?.displayName} type="text" className="input w-full mb-4" placeholder="Your Name" />
                                </fieldset>

                                {/* rider age */}
                                <fieldset className="fieldset">
                                    <label className="label">Your Age</label>
                                    <input {...register("riderAge")} type="number" className="input w-full mb-4" placeholder="Your Age" required />
                                </fieldset>
                            </div>

                            <div className="flex flex-col md:flex-row items-center gap-5">
                                <fieldset className="fieldset w-full">
                                    {/* rider email */}
                                    <label className="label">Your Email</label>
                                    <input {...register("riderEmail")} defaultValue={user?.email} type="email" className="input w-full mb-4" placeholder="Your Email" />
                                </fieldset>

                                {/* rider region */}
                                <fieldset className="fieldset w-full mb-4">
                                    <legend className="fieldset-legend">Your Region</legend>
                                    <select {...register("riderRegion")} defaultValue="Select Region" className="select w-full">
                                        <option disabled={true}>Select Region</option>
                                        {
                                            regions.map((r, index) => <option key={index} value={r}>{r}</option>)
                                        }
                                    </select>
                                </fieldset>
                            </div>

                            <div className="flex flex-col md:flex-row items-center gap-5">
                                {/* rider NID */}
                                <fieldset className="fieldset">
                                    <label className="label">NID No.</label>
                                    <input {...register("riderNID")} defaultValue={user?.displayName} type="number" className="input w-full mb-4" placeholder="NID" />
                                </fieldset>

                                {/* rider contact */}
                                <fieldset className="fieldset">
                                    <label className="label">Contact</label>
                                    <input {...register("riderContact")} type="text" className="input w-full mb-4" placeholder="Contact" required />
                                </fieldset>
                            </div>

                            {/* rider wire-house */}
                            <fieldset className="fieldset mb-4">
                                <legend className="fieldset-legend">Which wire-house you want to work?</legend>
                                <select {...register("riderDistrict")} defaultValue="Select wire-house" className="select w-full">
                                    <option disabled={true}>Select wire-house</option>
                                    {
                                        districtsByRegions(riderRegion).map((d, index) => <option key={index} value={d}>{d}</option>)
                                    }
                                </select>
                            </fieldset>

                            <input className="btn btn-primary text-black py-2 px-[66px]" type="submit" value="Submit"/>
                        </fieldset>
                    </form>
                </div>

                <img src={rider} alt="rider" />
            </div>
        </div>
    );
};

export default Rider;