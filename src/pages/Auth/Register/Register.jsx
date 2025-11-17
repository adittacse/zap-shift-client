import React from 'react';
import {useForm} from "react-hook-form";

const Register = () => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const handleRegistration = (data) => {
        //
    }

    return (
        <div>
            <form onSubmit={handleSubmit(handleRegistration)}>
                <fieldset className="fieldset">
                    {/* email */}
                    <label className="label">Email</label>
                    <input {...register("email", { required: true })} type="email" className="input" placeholder="Email" />
                    { errors.email?.type === "required" && <p className="text-red-500 font-medium">Email is Required</p> }

                    {/* password */}
                    <label className="label">Password</label>
                    <input {...register("password", {
                        required: true,
                        minLength: 6,
                        pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.[A-Za-z0-9]).+$/
                    })} type="password" className="input" placeholder="Password" />
                    { errors.password?.type === "required" && <p className="text-red-500 font-medium">Password is Required</p> }
                    { errors.password?.type === "minLength" && <p className="text-red-500 font-medium">Password must be at least 6 character</p> }
                    { errors.password?.type === "pattern" && <p className="text-red-500 font-medium">Password must have at leat one uppercase, at least one lowercase, at least one number, and at least one special character</p> }

                    <div><a className="link link-hover">Forgot password?</a></div>
                    <button className="btn btn-neutral mt-4">Register</button>
                </fieldset>
            </form>
        </div>
    );
};

export default Register;