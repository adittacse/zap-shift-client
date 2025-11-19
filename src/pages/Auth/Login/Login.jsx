import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import AuthContext from "../../../contexts/AuthContext/AuthContext.jsx";
import SocialLogin from "../SocialLogin/SocialLogin.jsx";

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();
    const { signInUser, setUser } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogin = (data) => {
        signInUser(data.email, data.password)
            .then((result) => {
                setUser(result.user);
                navigate(location?.state || "/", { replace: true });
            })
            .catch((error) => {
                console.log(error.message);
            })
    }

    return (
        <div className="card bg-base-100 w-full shrink-0">
            <div className="card-body">
                <h3 className="text-4xl font-bold mb-1">Welcome Back</h3>
                <p className="mb-5">Login with ZapShift</p>

                <form onSubmit={handleSubmit(handleLogin)}>
                    <fieldset className="fieldset">
                        {/* email */}
                        <label className="label">Email</label>
                        <input {...register("email", { required: true })} type="email" className="input w-full" placeholder="Email" />
                        { errors.email?.type === "required" && <p className="text-red-500 font-medium">Email is Required</p> }

                        {/* password */}
                        <label className="label">Password</label>
                        <input {...register("password", { required: true, minLength: 6 })} type="password" className="input w-full" placeholder="Password" />
                        { errors.password?.type === "required" && <p className="text-red-500 font-medium">Password is Required</p> }
                        { errors.password?.type === "minLength" && <p className="text-red-500 font-medium">Password must be at least 6 character</p> }

                        <div><a className="link underline">Forgot password?</a></div>
                        <button className="btn btn-neutral mt-4">Login</button>
                    </fieldset>
                </form>

                <p className="text-zinc-500">Don’t have any account? <Link state={location?.state} to="/register" className="link link-hover text-green-8">Register</Link></p>

                <SocialLogin />
            </div>
        </div>
    );
};

export default Login;