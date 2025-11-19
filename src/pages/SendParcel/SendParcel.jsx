import React from "react";
import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router";

const SendParcel = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm();
    const serviceCenters = useLoaderData();
    const regionsDuplicate = serviceCenters.map(c => c.region);
    const regions = [...new Set(regionsDuplicate)];
    const senderRegion = watch("senderRegion");

    const districtsByRegions = (region) => {
        const regionsDistricts = serviceCenters.filter(c => c.region === region);
        const districts = regionsDistricts.map(d => d.district);
        return districts;
    }

    const handleSendParcel = (data) => {
        //
    }

    return (
        <div className="bg-base-100 rounded-4xl py-20 px-[109px] mb-24">
            <h2 className="font-extrabold text-5xl text-secondary mb-[50px]">Send A Parcel</h2>
            <div className="divider"></div>

            <div>
                <form onSubmit={handleSubmit(handleSendParcel)}>
                    <fieldset className="fieldset">
                        <h2 className="text-[28px] text-secondary font-extrabold mb-[30px]">Enter your parcel details</h2>
                        {/* parcel type */}
                        <div className="mb-[30px]">
                            <label className="label mr-12">
                                <input {...register("parcelType")} type="radio" value="document" className="radio" defaultChecked />
                                Document
                            </label>
                            <label className="label">
                                <input {...register("parcelType")} type="radio" value="non-document" className="radio" />
                                Non-Document
                            </label>
                        </div>

                        {/* parcel info */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-[30px]">
                            <div className="flex flex-col w-full">
                                <label className="label">Parcel Name</label>
                                <input {...register("parcelName")} type="text" className="input w-full" placeholder="Parcel Name" />
                            </div>
                            <div className="flex flex-col w-full">
                                <label className="label">Parcel Weight (KG)</label>
                                <input {...register("parcelWeight")} type="number" className="input w-full" placeholder="Parcel Weight (KG)" />
                            </div>
                        </div>

                        <div className="divider"></div>

                        {/* two column */}
                        <div className="grid grild-cols-1 md:grid-cols-2 gap-[30px] mb-[50px]">
                            {/* sender details */}
                            <div>
                                <h3 className="text-[18px] text-secondary font-extrabold mb-[30px]">Sender Details</h3>

                                <fieldset className="fieldset">
                                    {/* sender name */}
                                    <label className="label">Sender Name</label>
                                    <input {...register("senderName")} type="text" className="input w-full mb-4" placeholder="Sender Name" />

                                    {/* sender email */}
                                    <label className="label">Sender Email</label>
                                    <input {...register("senderEmail")} type="email" className="input w-full mb-4" placeholder="Sender Email" />

                                    {/* sender address */}
                                    <label className="label">Sender Address</label>
                                    <input {...register("senderAddress")} type="text" className="input w-full mb-4" placeholder="Sender Address" />

                                    {/* sender phone number */}
                                    <label className="label">Sender Phone Number</label>
                                    <input {...register("senderPhoneNumber")} type="text" className="input w-full mb-4" placeholder="Sender Phone Number" />

                                    {/* sender region */}
                                    <fieldset className="fieldset mb-4">
                                        <legend className="fieldset-legend">Sender Region</legend>
                                        <select {...register("senderRegion")} defaultValue="Select Region" className="select w-full">
                                            <option disabled={true}>Select Region</option>
                                            {
                                                regions.map((r, index) => <option key={index} value={r}>{r}</option>)
                                            }
                                        </select>
                                    </fieldset>

                                    {/* sender districts */}
                                    <fieldset className="fieldset mb-4">
                                        <legend className="fieldset-legend">Sender District</legend>
                                        <select {...register("senderDistrict")} defaultValue="Select District" className="select w-full">
                                            <option disabled={true}>Select District</option>
                                            {
                                                districtsByRegions(senderRegion).map((r, index) => <option key={index} value={r}>{r}</option>)
                                            }
                                        </select>
                                    </fieldset>

                                    {/* pickup instruction */}
                                    <label className="label">Pickup Instruction</label>
                                    <textarea {...register("pickupInstruction")} className="textarea w-full h-24" placeholder="Pickup Instruction"></textarea>
                                </fieldset>
                            </div>

                            {/* receiver details */}
                            <div>
                                <h3 className="text-[18px] text-secondary font-extrabold mb-[30px]">Receiver Details</h3>

                                <fieldset className="fieldset">
                                    {/* Receiver name */}
                                    <label className="label">Receiver Name</label>
                                    <input {...register("ReceiverName")} type="text" className="input w-full mb-4" placeholder="Receiver Name" />

                                    {/* Receiver email */}
                                    <label className="label">Receiver email</label>
                                    <input {...register("ReceiverEmail")} type="email" className="input w-full mb-4" placeholder="Receiver Email" />

                                    {/* Receiver address */}
                                    <label className="label">Receiver Address</label>
                                    <input {...register("ReceiverAddress")} type="text" className="input w-full mb-4" placeholder="Receiver Address" />

                                    {/* Receiver phone number */}
                                    <label className="label">Receiver Phone Number</label>
                                    <input {...register("ReceiverPhoneNumber")} type="text" className="input w-full mb-4" placeholder="Receiver Phone Number" />

                                    {/* Receiver district */}
                                    <label className="label">Receiver District</label>
                                    <input {...register("ReceiverDistrict")} type="text" className="input w-full mb-4" placeholder="Receiver District" />

                                    {/* delivery instruction */}
                                    <label className="label">Delivery Instruction</label>
                                    <textarea {...register("deliveryInstruction")} className="textarea w-full h-24" placeholder="Delivery Instruction"></textarea>
                                </fieldset>
                            </div>
                        </div>

                        <p className="text-lg font-medium mb-[50px]">* PickUp Time 4pm-7pm Approx.</p>

                        <input className="btn btn-primary text-black w-fit py-2 px-[66px]" type="submit" value="Send Parcel"/>
                    </fieldset>
                </form>
            </div>
        </div>
    );
};

export default SendParcel;