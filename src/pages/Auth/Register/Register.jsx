import { useContext } from "react";
import { Link } from "react-router";
import { useForm } from "react-hook-form";
import AuthContext from "../../../contexts/AuthContext/AuthContext.jsx";
import SocialLogin from "../SocialLogin/SocialLogin.jsx";

const Register = () => {
    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm();
    const {registerUser} = useContext(AuthContext);

    const handleRegistration = (data) => {
        registerUser(data.email, data.password)
            .then(result => {
                console.log(result.user);
            })
            .catch(error => {
                console.log(error.message);
            })
    }

    return (
        <div className="card bg-base-100 w-full shrink-0">
            <div className="card-body">
                <h3 className="text-4xl font-bold mb-1">Create an Account</h3>
                <p className="mb-5">Register with ZapShift</p>

                <form onSubmit={handleSubmit(handleRegistration)}>
                    <fieldset className="fieldset">
                        {/* email */}
                        <label className="label">Email</label>
                        <input {...register("email", {required: true})} type="email" className="input w-full"
                               placeholder="Email"/>
                        {errors.email?.type === "required" &&
                            <p className="text-red-500 font-medium">Email is Required</p>}

                        {/* password */}
                        <label className="label">Password</label>
                        <input {...register("password", {
                            required: true,
                            minLength: 6,
                            pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.[A-Za-z0-9]).+$/
                        })} type="password" className="input w-full" placeholder="Password"/>
                        {errors.password?.type === "required" &&
                            <p className="text-red-500 font-medium">Password is Required</p>}
                        {errors.password?.type === "minLength" &&
                            <p className="text-red-500 font-medium">Password must be at least 6 character</p>}
                        {errors.password?.type === "pattern" &&
                            <p className="text-red-500 font-medium">Password must have at leat one uppercase, at least
                                one lowercase, at least one number, and at least one special character</p>}

                        <button className="btn btn-neutral mt-4">Register</button>
                    </fieldset>
                </form>

                <p className="text-zinc-500">Already have an account? Please <Link to="/login" className="link link-hover text-green-8">Login</Link>
                </p>

                <SocialLogin />
            </div>
        </div>
    );
};

export default Register;