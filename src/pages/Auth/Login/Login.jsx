import { useContext } from "react";
import { Link } from "react-router";
import { useForm } from "react-hook-form";
import AuthContext from "../../../contexts/AuthContext/AuthContext.jsx";

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();
    const { signInUser } = useContext(AuthContext);

    const handleLogin = (data) => {
        signInUser(data.email, data.password)
            .then((result) => {
                console.log(result.user);
            })
            .catch((error) => {
                console.log(error.message);
            })
    }

    return (
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
                <h1 className="text-5xl font-bold mb-1">Welcome Back</h1>
                <p className="mb-5">Login with ZapShift</p>

                <form onSubmit={handleSubmit(handleLogin)}>
                    <fieldset className="fieldset">
                        {/* email */}
                        <label className="label">Email</label>
                        <input {...register("email", { required: true })} type="email" className="input" placeholder="Email" />
                        { errors.email?.type === "required" && <p className="text-red-500 font-medium">Email is Required</p> }

                        {/* password */}
                        <label className="label">Password</label>
                        <input {...register("password", { required: true, minLength: 6 })} type="password" className="input" placeholder="Password" />
                        { errors.password?.type === "required" && <p className="text-red-500 font-medium">Password is Required</p> }
                        { errors.password?.type === "minLength" && <p className="text-red-500 font-medium">Password must be at least 6 character</p> }

                        <div><a className="link underline">Forgot password?</a></div>
                        <button className="btn btn-neutral mt-4">Login</button>
                    </fieldset>
                </form>

                <p>Don’t have any account? <Link to="/register" className="link link-hover">Register</Link></p>
                <p className="text-center">Or</p>

                {/* Google */}
                <button className="btn bg-white text-black border-[#e5e5e5]">
                    <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                    Login with Google
                </button>
            </div>
        </div>
    );
};

export default Login;